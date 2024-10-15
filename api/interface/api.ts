import { authHandler, initAuthConfig } from "@hono/auth-js"
import { apiFactory } from "~/interface/api-factory"
import { authConfig } from "~/interface/auth-config"
import { myUserRoutes } from "~/interface/routes/my-user"
import { usersRoutes } from "~/interface/routes/users"

export const api = apiFactory
  .createApp()
  .basePath("/api")
  .use("*", initAuthConfig(authConfig))
  .use("/auth/*", authHandler())
  .route("/", usersRoutes)
  .route("/", myUserRoutes)
