// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `potion_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.serial().primaryKey(),
    name: d.varchar("name", { length: 256 }),
    createdAt: d.timestamp().notNull(),
    updatedAt: d.timestamp().$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)]
);
