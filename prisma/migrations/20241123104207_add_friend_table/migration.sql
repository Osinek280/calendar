-- CreateTable
CREATE TABLE "friend" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);
