// src/db/schema.ts
import {
	date,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Supabase Auth user tablosu → user_id UUID olacak
export const campaigns = pgTable("campaigns", {
	id: serial("id").primaryKey(),

	title: varchar("title", { length: 255 }).notNull(),
	brand: varchar("brand", { length: 255 }).notNull(),

	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),

	budget: numeric("budget", { precision: 12, scale: 2 }).notNull(), // örnek: 10000.00

	imageUrl: text("image_url"), // Supabase bucket URL’si

	description: text("description"),

	userId: uuid("user_id").notNull(), // Supabase user ID (auth.users.id)

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
