import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


import colors from "../constants/colors";

type Props = {
  title: string;

  subtitle?: string;

  showButton?: boolean;

  buttonText?: string;
};

export default function ScreenHeader({
  title,
  subtitle,
  showButton,
  buttonText,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {showButton ? (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 4,
    marginBottom: 22,
  },

  title: {
    color: colors.text,

    fontSize: 32,

    fontWeight: "700",
  },

  subtitle: {
    color: colors.subText,

    marginTop: 4,

    fontSize: 14,
  },

  button: {
    height: 44,

    paddingHorizontal: 18,

    borderRadius: 16,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: colors.text,

    fontWeight: "700",

    fontSize: 14,
  },
});
