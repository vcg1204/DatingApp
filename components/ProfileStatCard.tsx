import { StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";

import layout from "../constants/layout";

type Props = {
  title: string;

  subtitle: string;

  value: string;
};

export default function ProfileStatCard({ title, subtitle, value }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    marginTop: 24,

    backgroundColor: colors.softCard,

    borderRadius: layout.radius.xl,

    paddingHorizontal: 20,
    paddingVertical: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    color: colors.text,

    fontSize: 16,

    fontWeight: "700",
  },

  subtitle: {
    color: colors.subText,

    marginTop: 4,

    fontSize: 12,
  },

  value: {
    color: colors.primary,

    fontSize: 42,

    fontWeight: "700",
  },
});
