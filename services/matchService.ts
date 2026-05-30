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
    .eq("receiver_id", userId);

  if (error) {
    console.log(error);
    return [];
  }

  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .or(`user_1.eq.${userId},user_2.eq.${userId}`);

  const matchedUserIds =
    matches?.map((match) =>
      match.user_1 === userId ? match.user_2 : match.user_1,
    ) || [];

  const filteredLikes =
    likes?.filter((like) => !matchedUserIds.includes(like.sender_id)) || [];

  const enrichedLikes = await Promise.all(
    filteredLikes.map(async (like) => {
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

export const createMatch = async (user_1: string, user_2: string) => {
  const { data, error } = await supabase
    .from("matches")
    .insert([
      {
        user_1,
        user_2,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export const getMatches = async (userId: string) => {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .or(`user_1.eq.${userId},user_2.eq.${userId}`);

  if (error) {
    console.log(error);
    return [];
  }

  return data || [];
};
