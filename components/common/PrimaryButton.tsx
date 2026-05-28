import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../constants/colors";

type Props = {
  title: string;

  onPress?: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 18,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",
  },

  text: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "700",
  },
});
