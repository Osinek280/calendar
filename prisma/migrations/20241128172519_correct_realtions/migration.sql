-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
