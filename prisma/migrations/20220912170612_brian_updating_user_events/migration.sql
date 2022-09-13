/*
  Warnings:

  - Added the required column `address` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `UserEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue` to the `UserEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEvents" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "venue" TEXT NOT NULL;
