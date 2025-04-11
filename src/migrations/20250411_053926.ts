import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_high_impact_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_high_impact_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_creative_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_creative_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_high_impact_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_high_impact_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_creative_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_creative_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_hero_high_impact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_high_impact_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_high_impact_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_creative_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_creative_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_creative_block_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_creative_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"background_image_id" integer,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_high_impact_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_high_impact_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_high_impact_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_creative_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_creative_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_creative_block_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_creative_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"background_image_id" integer,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_homeblock_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_homeblock" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_homeblock_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_homeblock" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_homeblock_links" CASCADE;
  DROP TABLE "pages_blocks_homeblock" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_homeblock_links" CASCADE;
  DROP TABLE "_pages_v_blocks_homeblock" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_media_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_high_impact_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_high_impact_background_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_high_impact_description" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_high_impact_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_high_impact_background_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_high_impact_description" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_high_impact_links" ADD CONSTRAINT "pages_hero_high_impact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_creative_block_links" ADD CONSTRAINT "pages_blocks_creative_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_creative_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_creative_block" ADD CONSTRAINT "pages_blocks_creative_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_creative_block" ADD CONSTRAINT "pages_blocks_creative_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_high_impact_links" ADD CONSTRAINT "_pages_v_version_hero_high_impact_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_creative_block_links" ADD CONSTRAINT "_pages_v_blocks_creative_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_creative_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_creative_block" ADD CONSTRAINT "_pages_v_blocks_creative_block_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_creative_block" ADD CONSTRAINT "_pages_v_blocks_creative_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_high_impact_links_order_idx" ON "pages_hero_high_impact_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_high_impact_links_parent_id_idx" ON "pages_hero_high_impact_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_links_order_idx" ON "pages_blocks_creative_block_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_links_parent_id_idx" ON "pages_blocks_creative_block_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_order_idx" ON "pages_blocks_creative_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_parent_id_idx" ON "pages_blocks_creative_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_path_idx" ON "pages_blocks_creative_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_creative_block_background_image_idx" ON "pages_blocks_creative_block" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_high_impact_links_order_idx" ON "_pages_v_version_hero_high_impact_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_high_impact_links_parent_id_idx" ON "_pages_v_version_hero_high_impact_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_links_order_idx" ON "_pages_v_blocks_creative_block_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_links_parent_id_idx" ON "_pages_v_blocks_creative_block_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_order_idx" ON "_pages_v_blocks_creative_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_parent_id_idx" ON "_pages_v_blocks_creative_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_path_idx" ON "_pages_v_blocks_creative_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_creative_block_background_image_idx" ON "_pages_v_blocks_creative_block" USING btree ("background_image_id");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_high_impact_background_image_id_media_id_fk" FOREIGN KEY ("hero_high_impact_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_high_impact_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_high_impact_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_high_impact_hero_high_impact_background_image_idx" ON "pages" USING btree ("hero_high_impact_background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_high_impact_version_hero_high_impact_background_image_idx" ON "_pages_v" USING btree ("version_hero_high_impact_background_image_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_media_id";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_homeblock_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_homeblock_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_homeblock_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_homeblock_links_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_homeblock_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_homeblock_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_homeblock_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_homeblock_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
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
  
  ALTER TABLE "pages_hero_high_impact_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_creative_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_creative_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_high_impact_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_creative_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_creative_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_high_impact_links" CASCADE;
  DROP TABLE "pages_blocks_creative_block_links" CASCADE;
  DROP TABLE "pages_blocks_creative_block" CASCADE;
  DROP TABLE "_pages_v_version_hero_high_impact_links" CASCADE;
  DROP TABLE "_pages_v_blocks_creative_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_creative_block" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_high_impact_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_high_impact_background_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_high_impact_hero_high_impact_background_image_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_high_impact_version_hero_high_impact_background_image_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_links_order_idx" ON "pages_blocks_homeblock_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_links_parent_id_idx" ON "pages_blocks_homeblock_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_order_idx" ON "pages_blocks_homeblock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_parent_id_idx" ON "pages_blocks_homeblock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_homeblock_path_idx" ON "pages_blocks_homeblock" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_links_order_idx" ON "_pages_v_blocks_homeblock_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_links_parent_id_idx" ON "_pages_v_blocks_homeblock_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_order_idx" ON "_pages_v_blocks_homeblock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_parent_id_idx" ON "_pages_v_blocks_homeblock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homeblock_path_idx" ON "_pages_v_blocks_homeblock" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_high_impact_heading";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_high_impact_background_image_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_high_impact_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_high_impact_heading";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_high_impact_background_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_high_impact_description";
  DROP TYPE "public"."enum_pages_hero_high_impact_links_link_type";
  DROP TYPE "public"."enum_pages_hero_high_impact_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_creative_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_creative_block_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_high_impact_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_high_impact_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_creative_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_creative_block_links_link_appearance";`)
}
