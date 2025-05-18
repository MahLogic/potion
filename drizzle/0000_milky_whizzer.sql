CREATE TABLE "potion_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "potion_post" USING btree ("name");