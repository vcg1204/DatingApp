import { useEffect } from "react";

import { View } from "react-native";

import { router } from "expo-router";

import { useUserStore } from "../store/useUserStore";

export default function Index() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const onboardingCompleted = useUserStore(
    (state) => state.onboardingCompleted,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoggedIn && onboardingCompleted) {
        router.replace("/(tabs)");
      } else {
        router.replace("/welcome");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return <View />;
}
