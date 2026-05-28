import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

import { uploadProfilePhoto } from "../../services/storageService";

export default function PhotosScreen() {
  const photos = useUserStore((state) => state.photos);

  const setPhotos = useUserStore((state) => state.setPhotos);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 0.7,

      allowsEditing: true,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;

    const uploadedUrl = await uploadProfilePhoto(localUri);

    if (!uploadedUrl) return;

    setPhotos([...photos, uploadedUrl]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add your photos</Text>

        <Text style={styles.subtitle}>Upload at least 3 photos.</Text>

        <View style={styles.grid}>
          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{
                uri: photo,
              }}
              style={styles.image}
            />
          ))}

          {photos.length < 6 && (
            <TouchableOpacity style={styles.addBox} onPress={pickImage}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          )}
        </View>

        {photos.length >= 3 && (
          <PrimaryButton
            title="Continue"
            onPress={() => router.push("/onboarding/face-scan")}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.background,
  },

  content: {
    padding: 24,
  },

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "700",
  },

  subtitle: {
    color: "#9A9AA3",

    fontSize: 16,

    marginTop: 14,

    marginBottom: 34,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    marginBottom: 40,
  },

  image: {
    width: "31%",

    aspectRatio: 0.75,

    borderRadius: 20,

    marginBottom: 12,
  },

  addBox: {
    width: "31%",

    aspectRatio: 0.75,

    borderRadius: 20,

    backgroundColor: colors.card,

    justifyContent: "center",

    alignItems: "center",
  },

  addText: {
    color: "#fff",

    fontSize: 40,

    fontWeight: "300",
  },
});
