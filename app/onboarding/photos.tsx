import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import PrimaryButton from "../../components/common/PrimaryButton";
import colors from "../../constants/colors";
import { uploadProfilePhoto } from "../../services/storageService";
import { useUserStore } from "../../store/useUserStore";

export default function PhotosScreen() {
  const photos = useUserStore((state) => state.photos);
  const setPhotos = useUserStore((state) => state.setPhotos);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        allowsEditing: true,
      });

      if (result.canceled) return;

      const uploadedUrl = await uploadProfilePhoto(result.assets[0].uri);

      if (!uploadedUrl) return;

      const updated = [...useUserStore.getState().photos, uploadedUrl];

      setPhotos(updated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Add your photos</Text>

        <Text style={styles.subtitle}>Upload at least 3 photos</Text>

        <View style={styles.grid}>
          {photos.map((photo, index) => (
            <View key={`${photo}-${index}`} style={styles.photoWrapper}>
              <Image
                source={{ uri: photo }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}

          {photos.length < 6 && (
            <TouchableOpacity style={styles.addBox} onPress={pickImage}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.counter}>{photos.length}/6 photos</Text>

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
    marginTop: 12,
    marginBottom: 28,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  photoWrapper: {
    width: "31%",
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    backgroundColor: "#222",
  },

  addBox: {
    width: "31%",
    height: 160,
    borderRadius: 18,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 40,
  },

  counter: {
    color: "#9A9AA3",
    marginTop: 20,
    marginBottom: 24,
  },
});
