CREATE TABLE "users2" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer,
	"email" text
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;