"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface CalendarProps {
  title: string;
  color: string;  
  isPublic: boolean; 
}

export async function addCalendar({title, color, isPublic}: CalendarProps) {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const supabase = createServerComponentClient({ cookies });

  try {
    const {error } = await supabase
    .from('calendar')
    .insert([{ 
      user_id: userId, 
      title: title,
      color: color,
      is_public: isPublic 
    }])

    if (error) {
      return { succes: false }
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
