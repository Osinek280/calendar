"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function getFriendRequest( friendId : string) {
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

export async function addFriend( friendId: string) {
  const { userId } = await auth();

  if (userId === friendId) {
    return { success: false, error: "You cannot add yourself as a friend." };
  }

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  try {
    const { error } = await supabase
    .from('friend')
    .insert([
      { user_id: userId, friend_id: friendId },
      { user_id: friendId, friend_id: userId }
    ])

    if (error) {
      return { succes: false }
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}