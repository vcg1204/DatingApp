import { supabase } from "../lib/supabase";

export const createUser = async (userData: any) => {
  try {
    const existingUser = await getUserByPhone(userData.phone);

    if (existingUser) {
      return existingUser;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.log("CREATE USER ERROR:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("CREATE USER ERROR:", err);
    return null;
  }
};

export const getUserByPhone = async (phone: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .limit(1);

    if (error) {
      console.log("GET USER ERROR:", error);
      return null;
    }

    return data?.[0] ?? null;
  } catch (err) {
    console.log("GET USER ERROR:", err);
    return null;
  }
};

export const updateUser = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.log("UPDATE USER ERROR:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("UPDATE USER ERROR:", err);
    return null;
  }
};
