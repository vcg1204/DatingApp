import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import colors from "../../constants/colors";

const mockChats = [
  {
    id: "1",

    name: "Sophia",

    message: "Hey, how’s your day going?",

    time: "2m",

    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },

  {
    id: "2",

    name: "Ava",

    message: "You seem fun 😄",

    time: "12m",

    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
  },
];

export default function MessagesScreen() {
  const openChat = () => {
    router.push("/(tabs)/chat");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            activeOpacity={0.85}
            onPress={openChat}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.avatar}
            />

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>

              <Text numberOfLines={1} style={styles.message}>
                {item.message}
              </Text>
            </View>

            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#050816",

    paddingHorizontal: 20,

    paddingTop: 60,
  },

  header: {
    marginBottom: 26,
  },

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "700",
  },

  chatCard: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 18,

    backgroundColor: "#0F172A",

    borderRadius: 24,

    padding: 14,
  },

  avatar: {
    width: 64,

    height: 64,

    borderRadius: 999,
  },

  chatInfo: {
    flex: 1,

    marginLeft: 14,
  },

  name: {
    color: "#fff",

    fontSize: 17,

    fontWeight: "600",
  },

  message: {
    color: "#9CA3AF",

    marginTop: 4,

    fontSize: 14,
  },

  time: {
    color: colors.primary,

    fontSize: 13,

    fontWeight: "600",
  },
});
