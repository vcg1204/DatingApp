import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { router } from "expo-router";

import colors from "../../constants/colors";

import AppInput from "../../components/common/AppInput";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

export default function EmailScreen() {
  const [email, setEmail] = useState("");

  const setUserEmail = useUserStore((state) => state.setEmail);

  const handleContinue = () => {
    setUserEmail(email);

    router.push("/onboarding/gender");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add your email</Text>

        <Text style={styles.subtitle}>
          Your email stays private and helps secure your account.
        </Text>

        <View style={styles.form}>
          <AppInput
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <PrimaryButton title="Continue" onPress={handleContinue} />
        </View>
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

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "700",
  },

  subtitle: {
    color: "#9A9AA3",

    fontSize: 16,

    lineHeight: 24,

    marginTop: 14,
  },

  form: {
    marginTop: 40,
  },
});
