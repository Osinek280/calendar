-- AlterTable
ALTER TABLE "user" ADD COLUMN     "active_calendars" TEXT[];

-- CreateTable
CREATE TABLE "friend" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#aabbcc',
    "nickname" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
