import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  jsonb,
  timestamp,
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

export const scannedProducts = pgTable("scanned_products", {
  barcode: varchar("barcode").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  image: text("image").notNull(),
  healthScore: integer("health_score").notNull(),
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
});

export const insertScannedProductSchema = createInsertSchema(scannedProducts).omit({
  createdAt: true,
  updatedAt: true,
});

export type InsertScannedProduct = z.infer<typeof insertScannedProductSchema>;
export type ScannedProduct = typeof scannedProducts.$inferSelect;
