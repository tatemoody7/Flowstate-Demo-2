import type { Express } from "express";
import { createServer, type Server } from "node:http";
import { storage } from "./storage";
import { fetchProduct, transformToProduct } from "./services/openFoodFacts";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/products — list all scanned products
  app.get("/api/products", async (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const tier = req.query.tier as string | undefined;

      const products = await storage.getAllProducts(search, tier);
      return res.json({ products });
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

    if (!barcode || barcode.length < 4) {
      return res.status(400).json({ status: "error", message: "Invalid barcode" });
    }

    try {
      // 1. Check the database cache first
      const cached = await storage.getProduct(barcode);

      if (cached) {
        // Return cached result immediately
        res.json({ status: "found", product: cached, source: "cache" });

        // Fire background refresh (don't await)
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

        return;
      }

      // 2. Not in cache — fetch from Open Food Facts
      const offResponse = await fetchProduct(barcode);

      if (offResponse.status === 0 || !offResponse.product) {
        return res.json({ status: "not_found" });
      }

      // 3. Transform, save to DB, return
      const product = transformToProduct(barcode, offResponse.product);
      const saved = await storage.upsertProduct(product);

      return res.json({ status: "found", product: saved, source: "api" });
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
