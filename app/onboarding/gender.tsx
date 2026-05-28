import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

const options = ["Man", "Woman", "Non-binary"];

export default function GenderScreen() {
  const gender = useUserStore((state) => state.gender);

  const setGender = useUserStore((state) => state.setGender);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>I am a</Text>

        <Text style={styles.subtitle}>Select your gender.</Text>

        <View style={styles.options}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.option, gender === item && styles.activeOption]}
              onPress={() => setGender(item)}
            >
              <Text
                style={[
                  styles.optionText,

                  gender === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => router.push("/onboarding/interested-in")}
        />
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

  options: {
    marginTop: 40,

    marginBottom: 30,
  },

  option: {
    height: 58,

    borderRadius: 18,

    backgroundColor: colors.card,

    justifyContent: "center",

    paddingHorizontal: 20,

    marginBottom: 14,
  },

  activeOption: {
    backgroundColor: colors.primary,
  },

  optionText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },
});
