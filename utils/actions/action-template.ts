"server only";

import { auth } from "@clerk/nextjs/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function actionTemplate( friendId : string) {
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

export async function addFriend( userId : string, friendId: string) {
  const supabase = createServerComponentClient({ cookies });

  console.log('lol')

  try {
    const {error } = await supabase
    .from('friend')
    .insert([{ user_id: userId, friend_id: friendId }])

    if (error) {
      return { succes: false }
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
