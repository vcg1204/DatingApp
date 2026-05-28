import { supabase } from "../lib/supabase";

export const createLike = async (
  sender_id: string,

  receiver_id: string,

  comment?: string,
) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([
      {
        sender_id,

        receiver_id,

        comment,
      },
    ])
    .select();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
};

export const createMatch = async (
  user_1: string,

  user_2: string,
) => {
  const { data, error } = await supabase
    .from("matches")
    .insert([
      {
        user_1,

        user_2,
      },
    ])
    .select();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
};
