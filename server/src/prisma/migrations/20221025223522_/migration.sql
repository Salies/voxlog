-- CreateEnum
CREATE TYPE "DaysRange" AS ENUM ('SEVEN', 'THIRTY', 'NINETY', 'ONE_EIGHTY', 'THREE_SIXTY', 'ALL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultTopAlbumsRange" "DaysRange" NOT NULL DEFAULT 'SEVEN',
ADD COLUMN     "defaultTopArtistsRange" "DaysRange" NOT NULL DEFAULT 'SEVEN',
ADD COLUMN     "defaultTopSongsRange" "DaysRange" NOT NULL DEFAULT 'SEVEN',
ADD COLUMN     "profilePictureUrl" VARCHAR(255);
