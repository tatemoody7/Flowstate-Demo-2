import type { Express } from "express";
import { createServer, type Server } from "node:http";
import { storage } from "./storage";
import { fetchProduct, transformToProduct } from "./services/openFoodFacts";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/products — list scanned products with cursor pagination
  app.get("/api/products", async (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const tier = req.query.tier as string | undefined;
      const store = req.query.store as string | undefined;
      const limit = Math.min(
        Math.max(parseInt(req.query.limit as string) || 30, 1),
        100,
      );
      const cursor = req.query.cursor as string | undefined;

      const result = await storage.getAllProducts(search, tier, store, limit, cursor);
      return res.json(result);
    } catch (error) {
      console.error("Failed to list products:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to list products" });
    }
  });

  // GET /api/products/:barcode — lookup a scanned product
  app.get("/api/products/:barcode", async (req, res) => {
    const { barcode } = req.params;

    const BARCODE_REGEX = /^\d{4,14}$/;
    if (!barcode || !BARCODE_REGEX.test(barcode)) {
      return res.status(400).json({ status: "error", message: "Invalid barcode" });
    }

    try {
      // 1. Check the database cache first
      const cached = await storage.getProduct(barcode);

      if (cached) {
        // Return cached result immediately
        res.json({ status: "found", product: cached, source: "cache" });

        // Only refresh if data is older than 7 days
        const REFRESH_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;
        const age = Date.now() - new Date(cached.updatedAt).getTime();
        if (age > REFRESH_THRESHOLD_MS) {
          fetchProduct(barcode)
            .then((offResponse) => {
              if (offResponse.status === 1 && offResponse.product) {
                const updated = transformToProduct(barcode, offResponse.product);
                return storage.upsertProduct(updated);
              }
            })
            .then(() => console.log(`Background refresh complete for ${barcode}`))
            .catch((err) =>
              console.error(`Background refresh failed for ${barcode}:`, err),
            );
        }

        return;
      }

      // 2. Not in cache — respond instantly, look up in background
      res.json({ status: "under_review" });

      // Fire background OFF lookup (user doesn't wait)
      fetchProduct(barcode)
        .then((offResponse) => {
          if (offResponse.status === 1 && offResponse.product) {
            const product = transformToProduct(barcode, offResponse.product);
            return storage.upsertProduct(product);
          }
        })
        .then((saved) => {
          if (saved) {
            console.log(`Background lookup added: ${saved.name} (${barcode})`);
          }
        })
        .catch((err) =>
          console.error(`Background lookup failed for ${barcode}:`, err),
        );

      return;
    } catch (error) {
      console.error(`Product lookup failed for ${barcode}:`, error);
      return res
        .status(500)
        .json({ status: "error", message: "Product lookup failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
