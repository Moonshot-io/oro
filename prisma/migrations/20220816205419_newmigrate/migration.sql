-- DropForeignKey
ALTER TABLE "EventPhotos" DROP CONSTRAINT "EventPhotos_commentsId_fkey";

-- AlterTable
ALTER TABLE "EventPhotos" ALTER COLUMN "deleteToken" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "commentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
