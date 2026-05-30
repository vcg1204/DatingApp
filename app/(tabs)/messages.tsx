import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import { router } from "expo-router";


import { supabase } from "../../lib/supabase";

import { useUserStore } from "../../store/useUserStore";

export default function MessagesScreen() {
  const [matches, setMatches] = useState<any[]>([]);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .or(`user_1.eq.${userId},user_2.eq.${userId}`);

    if (!data) return;

    const enriched = await Promise.all(
      data.map(async (match) => {
        const otherUserId =
          match.user_1 === userId ? match.user_2 : match.user_1;

        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", otherUserId)
          .single();

        return {
          ...match,
          user,
        };
      }),
    );

    setMatches(enriched);
  };

  const openChat = (user: any) => {
    router.push({
      pathname: "/(tabs)/chat",
      params: {
        userId: user.id,
        name: user.full_name,
        image: user.photos?.[0] || "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            activeOpacity={0.85}
            onPress={() => openChat(item.user)}
          >
            <Image
              source={{
                uri:
                  item.user?.photos?.[0] ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              }}
              style={styles.avatar}
            />

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.user?.full_name || "User"}</Text>

              <Text numberOfLines={1} style={styles.message}>
                Start chatting 💬
              </Text>
            </View>
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
});
