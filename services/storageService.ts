import { decode } from "base64-arraybuffer";

import * as FileSystem from "expo-file-system/legacy";

import { supabase } from "../lib/supabase";

export const uploadProfilePhoto = async (imageUri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("profile-photos")
      .upload(fileName, decode(base64), {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.log("STORAGE ERROR:", error);

      return null;
    }

    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.log("STORAGE ERROR:", err);

    return null;
  }
};
