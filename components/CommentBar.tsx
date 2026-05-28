import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/colors";

type Props = {
  value: string;

  onChangeText: (text: string) => void;
};

export default function CommentBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Add a comment..."
        placeholderTextColor={colors.subText}
        style={styles.input}
      />

      <TouchableOpacity style={styles.sendButton}>
        <Ionicons name="send" size={19} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 14,
  },

  input: {
    flex: 1,

    height: 54,

    backgroundColor: colors.card,

    borderRadius: 18,

    paddingHorizontal: 18,

    color: colors.text,

    fontSize: 15,
  },

  sendButton: {
    width: 54,

    height: 54,

    borderRadius: 18,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",

    marginLeft: 12,
  },
});
