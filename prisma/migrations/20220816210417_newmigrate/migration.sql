/*
  Warnings:

  - Made the column `created_at` on table `EventPhotos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventPhotos" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
