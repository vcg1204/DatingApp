import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import AppInput from "../../components/common/AppInput";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

export default function HeightScreen() {
  const height = useUserStore((state) => state.height);

  const setHeight = useUserStore((state) => state.setHeight);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your height</Text>

        <Text style={styles.subtitle}>This will appear on your profile.</Text>

        <View style={styles.form}>
          <AppInput
            label="Height"
            placeholder={`5'7"`}
            value={height}
            onChangeText={setHeight}
          />

          <PrimaryButton
            title="Continue"
            onPress={() => router.push("/onboarding/intention")}
          />
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

    marginTop: 14,
  },

  form: {
    marginTop: 40,
  },
});
