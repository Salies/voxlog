/*
  Warnings:

  - You are about to drop the column `coverArtUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `musicBrainzReleaseId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `coverArtUrl` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `musicBrainzArtistId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `coverArtUrl` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `musicBrainzRecordingId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `artUrl` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artUrl` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artUrl` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Made the column `defaultTopArtistsRange` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defaultTopAlbumsRange` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defaultTopSongsRange` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "coverArtUrl",
DROP COLUMN "musicBrainzReleaseId",
ADD COLUMN     "artUrl" VARCHAR(256) NOT NULL,
ADD COLUMN     "mbReleaseId" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "coverArtUrl",
DROP COLUMN "musicBrainzArtistId",
ADD COLUMN     "artUrl" VARCHAR(256) NOT NULL,
ADD COLUMN     "mbArtistId" TEXT;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "coverArtUrl",
DROP COLUMN "musicBrainzRecordingId",
ADD COLUMN     "artUrl" VARCHAR(256) NOT NULL,
ADD COLUMN     "mbRecordingId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "defaultTopArtistsRange" SET NOT NULL,
ALTER COLUMN "defaultTopAlbumsRange" SET NOT NULL,
ALTER COLUMN "defaultTopSongsRange" SET NOT NULL;
