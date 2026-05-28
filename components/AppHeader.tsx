import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/colors";

import layout from "../constants/layout";

type Props = {
  title: string;

  showPremium?: boolean;
};

export default function AppHeader({ title, showPremium = true }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options-outline" size={22} color="#fff" />
        </TouchableOpacity>

        {showPremium && (
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumText}>Premium</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.screenPadding,

    paddingTop: 4,

    paddingBottom: 14,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    color: colors.text,

    fontSize: 31,

    fontWeight: "700",
  },

  rightSection: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconButton: {
    width: 46,

    height: 46,

    borderRadius: 16,

    backgroundColor: colors.card,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 12,
  },

  premiumButton: {
    height: 46,

    paddingHorizontal: 20,

    borderRadius: 16,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",
  },

  premiumText: {
    color: colors.text,

    fontSize: 14,

    fontWeight: "700",
  },
});
