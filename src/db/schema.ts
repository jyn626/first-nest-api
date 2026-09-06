import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const files = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  path: text("path").notNull().unique(),
})