"server only"

import { userCreateProps } from "@/utils/types";
import { supabase } from "@/lib/supabase";

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {

  try {
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .select();

    console.log("data", data);
    console.log("error", error);

    if (error?.code) return error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
