import { authHandler, initAuthConfig } from "@hono/auth-js"
import { Hono } from "hono"
import { authConfig } from "./auth-config"
import { usersRoute } from "./routes/users"

export const api = new Hono<{ Bindings: { DB: D1Database } }>()
  .use("*", initAuthConfig(authConfig))
  .use("/api/auth/*", authHandler())
  .route("/api/users", usersRoute)

export type Api = typeof api
