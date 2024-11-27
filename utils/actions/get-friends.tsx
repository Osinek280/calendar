"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getFriends() {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const supabase = createServerComponentClient({ cookies });

  try {
    const { data: user, error } = await supabase
    .from('friend') 
    .select('*')
    .eq("user_id", userId)
    
    if (error) {
      return { friend: null, error: error.message }
    }

    return { friend: user };
  } catch (error: any) {
    return { friend: null, error: error.message };
  }
}
