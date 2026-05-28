import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { router } from "expo-router";

import colors from "../../constants/colors";

import AppInput from "../../components/common/AppInput";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

export default function BasicsScreen() {
  const [name, setName] = useState("");

  const setFullName = useUserStore((state) => state.setFullName);

  const handleContinue = () => {
    setFullName(name);

    router.push("/auth/email");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your name</Text>

        <Text style={styles.subtitle}>
          This is how people will see you on FaceMatch.
        </Text>

        <View style={styles.form}>
          <AppInput
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
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
