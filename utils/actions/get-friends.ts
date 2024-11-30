"use server";

import { createClient } from "@/lib/server";
import { auth } from "@clerk/nextjs/server";

export async function getFriends() {
  const { userId } = await auth();

  if (!userId) {
    return { friends: [], success: false };
  }

  const supabase = await createClient()

  try {
    const { data: friendsList, error } = await supabase
    .from('friend') 
    .select(`
      *,
      user (
        *
      )
    `)
    .eq("friend_id", userId)
    
    if (error) {
      return { friends: [], success: false };
    }

    return { friends: friendsList, success: false };
  } catch (error: any) {
    return { friends: [], success: false };
  }
}