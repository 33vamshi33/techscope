import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  source: text("source").notNull(),
  sourceIcon: text("source_icon").notNull(),
  sourceColor: text("source_color").notNull(),
  category: text("category").notNull(),
  categoryEmoji: text("category_emoji").notNull(),
  imageUrl: text("image_url").notNull(),
  readTime: integer("read_time").notNull(),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at").notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  views: true,
  likes: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  emoji: text("emoji").notNull(),
  color: text("color").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  active: boolean("active").notNull().default(true),
});

export const insertSourceSchema = createInsertSchema(sources).omit({
  id: true,
});

export type InsertSource = z.infer<typeof insertSourceSchema>;
export type Source = typeof sources.$inferSelect;
