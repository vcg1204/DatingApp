import { StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";

type Props = {
  text: string;

  sender: string;
};

export default function MessageBubble({ text, sender }: Props) {
  const isMe = sender === "me";

  return (
    <View
      style={[
        styles.container,

        isMe ? styles.myContainer : styles.theirContainer,
      ]}
    >
      <View
        style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,

    width: "100%",
  },

  myContainer: {
    alignItems: "flex-end",
  },

  theirContainer: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "78%",

    paddingHorizontal: 16,

    paddingVertical: 12,

    borderRadius: 22,
  },

  myBubble: {
    backgroundColor: colors.primary,

    borderBottomRightRadius: 8,
  },

  theirBubble: {
    backgroundColor: colors.card,

    borderBottomLeftRadius: 8,
  },

  text: {
    color: colors.text,

    fontSize: 15,

    lineHeight: 22,
  },
});
