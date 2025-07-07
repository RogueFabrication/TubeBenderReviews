import { pgTable, text, serial, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tubeBenders = pgTable("tube_benders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  rating: text("rating").notNull(), // Keep as string for compatibility
  priceRange: text("price_range").notNull(),
  priceMin: decimal("price_min", { precision: 8, scale: 2 }),
  priceMax: decimal("price_max", { precision: 8, scale: 2 }),
  componentPricing: jsonb("component_pricing").$type<{
    frame: { min: number; max: number };
    hydraulicRam: { min: number; max: number };
    die: { min: number; max: number };
    standMount: { min: number; max: number };
  }>(),
  maxCapacity: text("max_capacity").notNull(),
  powerType: text("power_type").notNull(),
  bendAngle: integer("bend_angle").notNull(),
  countryOfOrigin: text("country_of_origin").notNull(),
  warranty: text("warranty").notNull(),
  materials: jsonb("materials").$type<string[]>().notNull(),
  pros: jsonb("pros").$type<string[]>().notNull(),
  cons: jsonb("cons").$type<string[]>().notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  purchaseUrl: text("purchase_url"),
  category: text("category").notNull(), // professional, budget, heavy-duty, etc.
  isRecommended: boolean("is_recommended").default(false),
  totalCostOfOwnership: decimal("total_cost_ownership", { precision: 8, scale: 2 }),
  supportQuality: integer("support_quality").notNull(), // 1-10 scale
  buildQuality: integer("build_quality").notNull(), // 1-10 scale
  valueScore: integer("value_score").notNull(), // 1-10 scale
  features: jsonb("features").$type<string[]>().notNull(),
  mandrelBender: text("mandrel_bender").notNull(), // "No", "Available", "Standard", etc.
  wallThicknessCapacity: text("wall_thickness_capacity"), // 1.75" OD capacity (e.g., "0.156")
  sBendCapability: boolean("s_bend_capability").default(false),
  userReviewRating: text("user_review_rating"), // Average rating from reviews
  userReviewCount: integer("user_review_count"),
  importantNotes: jsonb("important_notes").$type<string[]>().default([]), // Editable important notes for price breakdown
});

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  productIds: jsonb("product_ids").$type<number[]>().notNull(),
});

export const costCalculations = pgTable("cost_calculations", {
  id: serial("id").primaryKey(),
  usage: text("usage").notNull(), // light, medium, heavy
  material: text("material").notNull(),
  timeline: text("timeline").notNull(),
  productId: integer("product_id").references(() => tubeBenders.id),
  initialCost: decimal("initial_cost", { precision: 8, scale: 2 }).notNull(),
  maintenanceCost: decimal("maintenance_cost", { precision: 8, scale: 2 }).notNull(),
  supportCost: decimal("support_cost", { precision: 8, scale: 2 }).notNull(),
  downtimeCost: decimal("downtime_cost", { precision: 8, scale: 2 }).notNull(),
  totalCost: decimal("total_cost", { precision: 8, scale: 2 }).notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: text("last_login"),
  createdAt: text("created_at").notNull().default("now()"),
  updatedAt: text("updated_at").notNull().default("now()"),
  loginAttempts: integer("login_attempts").notNull().default(0),
  lockedUntil: text("locked_until"),
});

export const insertTubeBenderSchema = createInsertSchema(tubeBenders).omit({
  id: true,
});

export const insertComparisonSchema = createInsertSchema(comparisons).omit({
  id: true,
});

export const insertCostCalculationSchema = createInsertSchema(costCalculations).omit({
  id: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  passwordHash: true,
  createdAt: true,
  updatedAt: true,
  loginAttempts: true,
  lockedUntil: true,
}).extend({
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(100),
});

export type TubeBender = typeof tubeBenders.$inferSelect;
export type InsertTubeBender = z.infer<typeof insertTubeBenderSchema>;
export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparison = z.infer<typeof insertComparisonSchema>;
export type CostCalculation = typeof costCalculations.$inferSelect;
export type InsertCostCalculation = z.infer<typeof insertCostCalculationSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
