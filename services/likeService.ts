import { supabase } from "../lib/supabase";

export const createLike = async (
  senderId: string,
  receiverId: string,
  comment?: string,
) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        comment: comment || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("CREATE LIKE ERROR:", error);
    return null;
  }

  return data;
};

export const getIncomingLikes = async (userId: string) => {
  const { data: likes, error } = await supabase
    .from("likes")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log("GET LIKES ERROR:", error);
    return [];
  }

  const enrichedLikes = await Promise.all(
    (likes || []).map(async (like) => {
      const { data: sender } = await supabase
        .from("users")
        .select("*")
        .eq("id", like.sender_id)
        .single();

      return {
        ...like,
        sender,
      };
    }),
  );

  return enrichedLikes;
};
