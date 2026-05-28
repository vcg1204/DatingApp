import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import colors from "../constants/colors";

type Props = {
  name: string;

  image: string;
};

export default function ChatHeader({ name, image }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.status}>Online</Text>
      </View>

      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    paddingBottom: 18,
  },

  image: {
    width: 48,
    height: 48,

    borderRadius: 16,

    marginLeft: 10,
  },

  info: {
    flex: 1,

    marginLeft: 12,
  },

  name: {
    color: colors.text,

    fontSize: 17,

    fontWeight: "700",
  },

  status: {
    color: colors.success,

    fontSize: 13,

    marginTop: 2,
  },

  moreButton: {
    width: 42,

    height: 42,

    borderRadius: 14,

    backgroundColor: colors.card,

    justifyContent: "center",

    alignItems: "center",
  },
});
