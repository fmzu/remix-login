import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { usersTable } from "~/schema"
import { zValidator } from "@hono/zod-validator"
import { object, string } from "zod"
import { genSaltSync, hashSync } from "bcrypt-ts"

export const usersRoute = new Hono<{ Bindings: { DB: D1Database } }>()
  .post(
    "/",
    zValidator(
      "json",
      object({
        email: string(),
        password: string(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      const userUuid = crypto.randomUUID()

      await db.insert(usersTable).values({
        id: userUuid,
        email: json.email,
        hashedPassword: hashedPassword,
      })

      return c.json({}, {})
    },
  )
  .get("/", async (c) => {
    const db = drizzle(c.env.DB)

    const users = await db.select().from(usersTable)

    const results = users.map((user) => {
      return {
        id: user.id,
      }
    })

    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  })
  .put("/", async (c) => {
    return new Response()
  })
  .delete("/", async (c) => {
    return new Response()
  })
