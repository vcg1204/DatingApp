import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";

type Props = {
  title: string;

  onPress?: () => void;

  variant?: "primary" | "secondary";

  icon?: any;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,

        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
      ]}
    >
      {icon}

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: colors.primary,
  },

  secondaryButton: {
    backgroundColor: colors.card,
  },

  text: {
    color: colors.text,

    fontSize: 15,

    fontWeight: "700",

    marginLeft: 8,
  },
});
