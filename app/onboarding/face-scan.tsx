import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import colors from "../../constants/colors";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

import { createUser } from "../../services/userService";

export default function FaceScanScreen() {
  const fullName = useUserStore((state) => state.fullName);

  const phone = useUserStore((state) => state.phone);

  const email = useUserStore((state) => state.email);

  const gender = useUserStore((state) => state.gender);

  const interestedIn = useUserStore((state) => state.interestedIn);

  const height = useUserStore((state) => state.height);

  const datingIntention = useUserStore((state) => state.datingIntention);

  const photos = useUserStore((state) => state.photos);

  const setOnboardingCompleted = useUserStore(
    (state) => state.setOnboardingCompleted,
  );

  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const setFaceMatchScore = useUserStore((state) => state.setFaceMatchScore);

  const setUserId = useUserStore((state) => state.setUserId);

  const handleComplete = async () => {
    const randomScore = Number((Math.random() * 3 + 7).toFixed(1));

    setFaceMatchScore(randomScore);

    const createdUser = await createUser({
      full_name: fullName,

      phone,

      email,

      gender,

      interested_in: interestedIn,

      height,

      dating_intention: datingIntention,

      face_match_score: randomScore,

      photos,
    });

    if (createdUser?.[0]?.id) {
      setUserId(createdUser[0].id);
    }

    setOnboardingCompleted(true);

    setIsLoggedIn(true);

    setTimeout(() => {
      router.replace("/(tabs)");
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Ionicons name="scan" size={72} color={colors.primary} />
        </View>

        <Text style={styles.title}>FaceMatch Scan</Text>

        <Text style={styles.subtitle}>
          Generate your private FaceMatch score.
        </Text>

        <PrimaryButton title="Start Face Scan" onPress={handleComplete} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.background,
  },

  content: {
    flex: 1,

    justifyContent: "center",

    paddingHorizontal: 24,
  },

  iconWrapper: {
    width: 140,

    height: 140,

    borderRadius: 999,

    backgroundColor: colors.card,

    justifyContent: "center",

    alignItems: "center",

    alignSelf: "center",

    marginBottom: 40,
  },

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "700",

    textAlign: "center",
  },

  subtitle: {
    color: "#9A9AA3",

    fontSize: 16,

    lineHeight: 26,

    textAlign: "center",

    marginTop: 16,

    marginBottom: 40,
  },
});
