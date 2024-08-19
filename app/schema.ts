import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  uuid: text("uuid", { length: 256 }).notNull(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  login: text("login", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }),
})
