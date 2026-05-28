import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/colors";

export default function BottomActions({ onPass, onLike }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.passButton} onPress={onPass}>
        <Ionicons name="close" size={34} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.likeButton} onPress={onLike}>
        <Ionicons name="heart" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 20,

    marginBottom: 6,
  },

  passButton: {
    width: 72,

    height: 72,

    borderRadius: 36,

    backgroundColor: "#232633",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 26,
  },

  likeButton: {
    width: 82,

    height: 82,

    borderRadius: 41,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",
  },
});
