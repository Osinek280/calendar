"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getFriendRequest( friendId : string) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data: user, error } = await supabase
    .from('user') 
    .select('*')
    .eq('user_id', friendId) 
    .single();  

    if (error) {
      return { friend: null, error: error.message }
    }

    return { friend: user };
  } catch (error: any) {
    return { friend: null, error: error.message };
  }
}

export async function addFriend(friendId: string) {
  const { userId } = await auth();

  if (userId === friendId) {
    return { success: false, error: "You cannot add yourself as a friend." };
  }

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const supabase = createServerComponentClient({ cookies });

  try {
    const { data: existingFriendship, error: checkError } = await supabase
      .from('friend')
      .select('id')
      .or(`(user_id.eq.${userId},friend_id.eq.${friendId}), (user_id.eq.${friendId},friend_id.eq.${userId})`);

    if (checkError) {
      return { success: false, error: "Error checking existing friendship." };
    }

    if (existingFriendship && existingFriendship.length > 0) {
      return { success: false, error: "You are already friends." };
    }

    const { error: insertError } = await supabase
      .from('friend')
      .insert([
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId }
      ]);

    if (insertError) {
      return { success: false, error: "Failed to add friend." };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
