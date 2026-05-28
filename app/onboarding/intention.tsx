import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

const intentions = [
  "Long-term relationship",
  "Short-term dating",
  "Not sure yet",
  "Open to meaningful connections",
];

export default function IntentionScreen() {
  const datingIntention = useUserStore((state) => state.datingIntention);

  const setDatingIntention = useUserStore((state) => state.setDatingIntention);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dating intention</Text>

        <Text style={styles.subtitle}>
          Let people know what you’re looking for.
        </Text>

        <View style={styles.options}>
          {intentions.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.option,

                datingIntention === item && styles.activeOption,
              ]}
              onPress={() => setDatingIntention(item)}
            >
              <Text
                style={[
                  styles.optionText,

                  datingIntention === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => router.push("/onboarding/photos")}
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
    minHeight: 58,

    borderRadius: 18,

    backgroundColor: colors.card,

    justifyContent: "center",

    paddingHorizontal: 20,

    paddingVertical: 18,

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
