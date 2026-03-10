import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ─── Scanned Products ─────────────────────────────────────────────────────────

export const scannedProducts = pgTable(
  "scanned_products",
  {
    barcode: varchar("barcode").primaryKey(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    image: text("image").notNull(),
    healthScore: integer("health_score").notNull().default(0),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    carbs: integer("carbs").notNull(),
    fat: integer("fat").notNull(),
    fiber: integer("fiber").notNull(),
    sugar: integer("sugar").notNull(),
    sodium: integer("sodium").notNull(),
    ingredients: jsonb("ingredients"),
    ingredientsRaw: text("ingredients_raw"),
    allergens: text("allergens"),
    additives: jsonb("additives"),
    nutritionGrade: text("nutrition_grade"),
    servingSize: text("serving_size"),
    stores: jsonb("stores").$type<string[]>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Pagination: ORDER BY updated_at DESC, barcode ASC
    index("idx_products_updated_barcode").on(table.updatedAt, table.barcode),
    // Store filter: GIN index for JSONB @> containment queries
    index("idx_products_stores").using("gin", table.stores),
    // Search: btree indexes for name/brand sorting & prefix matching
    index("idx_products_name").on(table.name),
    index("idx_products_brand").on(table.brand),
  ],
);

export const insertScannedProductSchema = createInsertSchema(scannedProducts).omit({
  createdAt: true,
  updatedAt: true,
});

export type InsertScannedProduct = z.infer<typeof insertScannedProductSchema>;
export type ScannedProduct = typeof scannedProducts.$inferSelect;
