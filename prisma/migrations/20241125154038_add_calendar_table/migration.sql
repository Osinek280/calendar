-- CreateTable
CREATE TABLE "calendar" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);
