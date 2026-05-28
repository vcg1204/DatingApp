import { supabase } from "../lib/supabase";

export const uploadProfilePhoto = async (imageUri: string) => {
  try {
    const response = await fetch(imageUri);

    const blob = await response.blob();

    const fileName = `${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("profile-photos")
      .upload(fileName, blob, {
        contentType: "image/jpeg",
      });

    if (error) {
      console.log(error);

      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  } catch (err) {
    console.log(err);

    return null;
  }
};
