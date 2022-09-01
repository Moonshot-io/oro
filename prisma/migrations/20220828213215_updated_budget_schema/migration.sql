/*
  Warnings:

  - Added the required column `userEventId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "userEventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserEvents" ADD COLUMN     "budgetId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
