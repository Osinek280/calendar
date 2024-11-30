"use server";

import { auth } from "@clerk/nextjs/server";

import { createClient } from "@/lib/server"; 

export async function getFriendRequest( friendId : string) {

  const supabase = await createClient()

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

  const supabase = await createClient()

  try {
    const { data, error: selectError } = await supabase
      .from('friend')
      .select()
      .in('user_id', [userId, friendId])  
      .in('friend_id', [userId, friendId]); 

    if (selectError) {
      return { success: false, error: selectError.message };
    }

    if (data && data.length > 0) {
      return { success: false, error: `You are already friends with ${friendId}.` };
    }

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

export async function removeFriend(friendId: string) {
  const { userId } = await auth();

  if (userId === friendId) {
    return { success: false, error: "You cannot remove yourself as a friend." };
  }

  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('friend')
      .delete()
      .in('user_id', [userId, friendId])  
      .in('friend_id', [userId, friendId]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
