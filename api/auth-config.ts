import Credentials from "@auth/core/providers/credentials"
import type { AuthConfig } from "@hono/auth-js"
import { compareSync } from "bcrypt-ts"
import { drizzle } from "drizzle-orm/d1"
import type { Context } from "hono"
import { eq } from "drizzle-orm"
import { usersTable } from "~/schema"

export function authConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [
      Credentials({
        type: "credentials",
        credentials: {
          email: { type: "text" },
          password: { type: "password" },
        },
        async authorize(credentials) {
          console.log("111", credentials)
          if (typeof credentials.email !== "string") {
            return null
          }
          if (typeof credentials.password !== "string") {
            return null
          }
          console.log("aaa", credentials)
          const db = drizzle(c.env.DB)

          const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.email))
            .get()

          if (user === undefined) {
            return null
          }

          if (user.email !== credentials.email) {
            return null
          }

          if (typeof user.hashedPassword !== "string") {
            return null
          }
          const result = compareSync(credentials.password, user.hashedPassword)

          if (result === false) {
            return null
          }

          return {
            id: user.id,
          }
        },
      }),
    ],
  }
}
