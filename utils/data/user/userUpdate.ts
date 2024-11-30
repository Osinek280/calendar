"server only";
import { createClient } from "@/lib/server";
import { userUpdateProps } from "@/utils/types";

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userUpdateProps) => {

  const supabase = await createClient()

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