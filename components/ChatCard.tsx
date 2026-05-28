import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";

import layout from "../constants/layout";

type Props = {
  name: string;

  message: string;

  time: string;

  image: string;

  unread?: boolean;

  onPress?: () => void;
};

export default function ChatCard({
  name,
  message,
  time,
  image,
  unread,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.message} numberOfLines={1}>
            {message}
          </Text>

          {unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: colors.card,

    borderRadius: layout.radius.xl,

    padding: 16,

    marginBottom: 16,
  },

  image: {
    width: 74,
    height: 74,

    borderRadius: 24,
  },

  info: {
    flex: 1,

    marginLeft: 16,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  bottomRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  name: {
    color: colors.text,

    fontSize: 19,

    fontWeight: "700",
  },

  time: {
    color: colors.subText,

    fontSize: 13,
  },

  message: {
    flex: 1,

    color: "#B6BBC8",

    fontSize: 15,
  },

  unreadDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: colors.primary,

    marginLeft: 10,
  },
});
