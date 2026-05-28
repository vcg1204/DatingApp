import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/colors";

type Props = {
  title: string;

  icon: any;

  onPress?: () => void;
};

export default function SettingItem({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#fff" />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.subText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,

    backgroundColor: colors.card,

    borderRadius: 24,

    paddingHorizontal: 18,

    marginBottom: 14,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 16,

    backgroundColor: colors.softCard,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.text,

    fontSize: 15,

    marginLeft: 14,

    fontWeight: "600",
  },
});
