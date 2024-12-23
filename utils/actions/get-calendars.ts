"use server"

import { createClient } from "@/lib/server";
import { auth } from "@clerk/nextjs/server"

export async function getCalendarsList() {
  const { userId } = await auth()

  if (!userId) {
    return { my_plans: [], friends: [], success: false };
  }

  const supabase = await createClient()

  try {
    const { data: my_plans, error } = await supabase
    .from('calendar')
    .select(`*`)
    .eq("user_id", userId)

    if(error) {
      return { my_plans: [], friends: [], success: false }
    }
    
    return { my_plans, friends: [], success: true }

  }catch(err) {
    return { my_plans: [], friends: [], success: false }
  }
}