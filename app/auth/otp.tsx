import React, { useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import AppInput from "../../components/common/AppInput";

import PrimaryButton from "../../components/common/PrimaryButton";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    router.push("/auth/basics");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.subtitle}>
          Enter the verification code sent to your phone.
        </Text>

        <View style={styles.form}>
          <AppInput
            label="OTP"
            placeholder="123456"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          <PrimaryButton title="Verify" onPress={handleVerify} />
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
