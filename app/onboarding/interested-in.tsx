import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../../constants/colors";

import PrimaryButton from "../../components/common/PrimaryButton";

import { useUserStore } from "../../store/useUserStore";

const options = ["Men", "Women", "Everyone"];

export default function InterestedInScreen() {
  const interestedIn = useUserStore((state) => state.interestedIn);

  const setInterestedIn = useUserStore((state) => state.setInterestedIn);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Interested in</Text>

        <Text style={styles.subtitle}>Choose who you want to see.</Text>

        <View style={styles.options}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.option,

                interestedIn === item && styles.activeOption,
              ]}
              onPress={() => setInterestedIn(item)}
            >
              <Text
                style={[
                  styles.optionText,

                  interestedIn === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="Continue"
          onPress={() => router.push("/onboarding/height")}
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
