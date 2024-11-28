"server only";
import { supabase } from "@/lib/supabase";
import { userUpdateProps } from "@/utils/types";

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userUpdateProps) => {

  try {
    const { data, error } = await supabase
      .from("user")
      .update([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .eq("email", email)
      .select();

    if (data) return data;

    if (error) return error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
