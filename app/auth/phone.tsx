import { StyleSheet, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { useState } from "react";

import PrimaryButton from "../../components/PrimaryButton";


import { useUserStore } from "../../store/useUserStore";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");

  const setPhoneNumber = useUserStore((state) => state.setPhoneNumber);

  const handleContinue = () => {
    if (phone.length < 10) return;

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
