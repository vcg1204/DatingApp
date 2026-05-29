import { StyleSheet, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { useState } from "react";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

import { getUserByPhone } from "../../services/userService";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");

  const setPhoneNumber = useUserStore((state) => state.setPhoneNumber);

  const setUserId = useUserStore((state) => state.setUserId);

  const setFullName = useUserStore((state) => state.setFullName);

  const setEmail = useUserStore((state) => state.setEmail);

  const setGender = useUserStore((state) => state.setGender);

  const setInterestedIn = useUserStore((state) => state.setInterestedIn);

  const setDatingIntention = useUserStore((state) => state.setDatingIntention);

  const setHeight = useUserStore((state) => state.setHeight);

  const setPhotos = useUserStore((state) => state.setPhotos);

  const setFaceMatchScore = useUserStore((state) => state.setFaceMatchScore);

  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const setOnboardingCompleted = useUserStore(
    (state) => state.setOnboardingCompleted,
  );

  const handleContinue = async () => {
    if (phone.length < 10) return;

    const existingUser = await getUserByPhone(phone);

    if (existingUser) {
      setUserId(existingUser.id || "");

      setPhoneNumber(existingUser.phone || "");

      setFullName(existingUser.full_name || "");

      setEmail(existingUser.email || "");

      setGender(existingUser.gender || "");

      setInterestedIn(existingUser.interested_in || "");

      setDatingIntention(existingUser.dating_intention || "");

      setHeight(existingUser.height || "");

      setPhotos(existingUser.photos || []);

      setFaceMatchScore(existingUser.face_match_score || 0);

      setIsLoggedIn(true);

      setOnboardingCompleted(true);

      router.replace("/(tabs)");

      return;
    }

    setPhoneNumber(phone);

    router.push("/auth/otp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone</Text>

        <Text style={styles.subtitle}>
          We’ll send you an OTP verification code.
        </Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <PrimaryButton title="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 36,
  },

  input: {
    height: 60,
    borderRadius: 18,
    backgroundColor: "#111827",
    paddingHorizontal: 18,
    color: "#fff",
    fontSize: 16,
    marginBottom: 28,
  },
});
