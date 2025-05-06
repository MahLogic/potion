import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpClient } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: NeonHttpClient | undefined;
};

export const client = globalForDb.client ?? neon(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
