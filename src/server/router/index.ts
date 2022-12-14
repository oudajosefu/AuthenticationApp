// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { credentialsRouter } from "./credentials";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { protectedUserRouter } from "./protected-user-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("credentials.", credentialsRouter)
  .merge("user.", protectedUserRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
