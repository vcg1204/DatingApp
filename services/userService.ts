import { supabase } from "../lib/supabase";

export const createUser = async (userData: any) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
};
