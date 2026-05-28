import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { useEffect } from "react";

import colors from "../constants/colors";

import PrimaryButton from "../components/common/PrimaryButton";

import { useUserStore } from "../store/useUserStore";

export default function WelcomeScreen() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const onboardingCompleted = useUserStore(
    (state) => state.onboardingCompleted,
  );

  useEffect(() => {
    if (isLoggedIn && onboardingCompleted) {
      router.replace("/index");
    }
  }, [isLoggedIn, onboardingCompleted]);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        <View style={styles.bottom}>
          <Text style={styles.logo}>FaceMatch</Text>

          <Text style={styles.title}>Match beyond first impressions.</Text>

          <Text style={styles.subtitle}>
            Discover people through attraction, intention, and compatibility.
          </Text>

          <View style={styles.buttons}>
            <PrimaryButton
              title="Create Account"
              onPress={() => router.push("/auth/phone")}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(0,0,0,0.48)",
  },

  container: {
    flex: 1,

    justifyContent: "flex-end",
  },

  bottom: {
    paddingHorizontal: 24,

    paddingBottom: 50,
  },

  logo: {
    color: colors.primary,

    fontSize: 22,

    fontWeight: "700",

    marginBottom: 18,
  },

  title: {
    color: "#fff",

    fontSize: 42,

    lineHeight: 48,

    fontWeight: "700",
  },

  subtitle: {
    color: "#D1D1D6",

    fontSize: 16,

    lineHeight: 26,

    marginTop: 18,
  },

  buttons: {
    marginTop: 34,
  },
});
