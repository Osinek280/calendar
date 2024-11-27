-- AlterTable
ALTER TABLE "friend" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#aabbcc',
ADD COLUMN     "nickname" TEXT;
