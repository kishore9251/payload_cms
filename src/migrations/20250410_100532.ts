import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_homeblock_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_homeblock_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_homeblock_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_homeblock_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_blocks_homeblock_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_homeblock_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_homeblock_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_homeblock" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_homeblock_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_homeblock_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_homeblock_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_homeblock" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "header" ADD COLUMN "account" varchar DEFAULT 'Account';
  ALTER TABLE "header" ADD COLUMN "phonenumber" numeric DEFAULT '+6578383900';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_homeblock_links" ADD CONSTRAINT "pages_blocks_homeblock_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homeblock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_homeblock" ADD CONSTRAINT "pages_blocks_homeblock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_homeblock_links" ADD CONSTRAINT "_pages_v_blocks_homeblock_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homeblock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_homeblock" ADD CONSTRAINT "_pages_v_blocks_homeblock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_links_order_idx" ON "pages_blocks_homeblock_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_links_parent_id_idx" ON "pages_blocks_homeblock_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_order_idx" ON "pages_blocks_homeblock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_parent_id_idx" ON "pages_blocks_homeblock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_path_idx" ON "pages_blocks_homeblock" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_links_order_idx" ON "_pages_v_blocks_homeblock_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_links_parent_id_idx" ON "_pages_v_blocks_homeblock_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_order_idx" ON "_pages_v_blocks_homeblock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_parent_id_idx" ON "_pages_v_blocks_homeblock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_path_idx" ON "_pages_v_blocks_homeblock" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_homeblock_links" CASCADE;
  DROP TABLE "pages_blocks_homeblock" CASCADE;
  DROP TABLE "_pages_v_blocks_homeblock_links" CASCADE;
  DROP TABLE "_pages_v_blocks_homeblock" CASCADE;
  ALTER TABLE "header" DROP COLUMN IF EXISTS "account";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "phonenumber";
  DROP TYPE "public"."enum_pages_blocks_homeblock_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_homeblock_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_homeblock_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_homeblock_links_link_appearance";`)
}
