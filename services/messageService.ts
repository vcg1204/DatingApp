import { supabase } from "../lib/supabase";

export const sendMessage = async (
  match_id: string,

  sender_id: string,

  text: string,
) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        match_id,

        sender_id,

        text,
      },
    ])
    .select();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
};

export const getMessages = async (match_id: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("match_id", match_id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.log(error);

    return [];
  }

  return data;
};

export const subscribeToMessages = (
  match_id: string,

  callback: (payload: any) => void,
) => {
  return supabase
    .channel(`messages-${match_id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",

        schema: "public",

        table: "messages",

        filter: `match_id=eq.${match_id}`,
      },

      callback,
    )
    .subscribe();
};
