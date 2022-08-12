/*
  Warnings:

  - Added the required column `bio` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homepage` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itunes` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wiki` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArtistFollowing" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "homepage" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "itunes" TEXT NOT NULL,
ADD COLUMN     "ticketId" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL,
ADD COLUMN     "wiki" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "googleId" DROP NOT NULL,
ALTER COLUMN "fbId" DROP NOT NULL,
ALTER COLUMN "instaId" DROP NOT NULL,
ALTER COLUMN "snapchatId" DROP NOT NULL,
ALTER COLUMN "twitterId" DROP NOT NULL;
