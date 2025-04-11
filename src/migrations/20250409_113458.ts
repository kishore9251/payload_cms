import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  DROP TABLE "header_nav_items_links" CASCADE;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_type" "enum_header_nav_items_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header" DROP COLUMN IF EXISTS "account";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "phonenumber";
  DROP TYPE "public"."enum_header_nav_items_links_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "header_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "header" ADD COLUMN "account" varchar DEFAULT 'Account';
  ALTER TABLE "header" ADD COLUMN "phonenumber" numeric DEFAULT '+23467899980';
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_links" ADD CONSTRAINT "header_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_nav_items_links_order_idx" ON "header_nav_items_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_links_parent_id_idx" ON "header_nav_items_links" USING btree ("_parent_id");
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_header_nav_items_link_type";`)
}
