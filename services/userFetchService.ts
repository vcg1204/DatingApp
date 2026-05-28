import { supabase } from "../lib/supabase";

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.log(error);

    return [];
  }

  return data;
};
