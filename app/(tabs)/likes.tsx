import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { router } from "expo-router";

import colors from "../../constants/colors";

import { createLike, getIncomingLikes } from "../../services/likeService";

import { createMatch } from "../../services/matchService";

import { useUserStore } from "../../store/useUserStore";

export default function LikesScreen() {
  const [likes, setLikes] = useState<any[]>([]);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    loadLikes();
  }, []);

  const loadLikes = async () => {
    const data = await getIncomingLikes(userId);

    setLikes(data || []);
  };

  const handleLikeBack = async (senderId: string) => {
    await createLike(userId, senderId);

    await createMatch(userId, senderId);

    Alert.alert("It's a Match ❤️", "You can start chatting now.", [
      {
        text: "Start Chat",
        onPress: () => {
          router.push("/messages");
        },
      },
    ]);

    loadLikes();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Likes</Text>

      {likes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No likes yet</Text>

          <Text style={styles.emptySubtext}>
            When someone likes you, they'll appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={likes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
          renderItem={({ item }) => {
            const sender = item.sender;

            return (
              <View style={styles.card}>
                <Image
                  source={{
                    uri:
                      sender?.photos?.[0] ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                  }}
                  style={styles.image}
                />

                <View style={styles.content}>
                  <Text style={styles.name}>{sender?.full_name || "User"}</Text>

                  <Text style={styles.city}>{sender?.city || ""}</Text>

                  {item.comment ? (
                    <View style={styles.commentBox}>
                      <Text style={styles.commentLabel}>Comment</Text>

                      <Text style={styles.commentText}>{item.comment}</Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={styles.likeBackButton}
                    onPress={() => handleLikeBack(sender.id)}
                  >
                    <Text style={styles.likeBackText}>Like Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 24,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  emptySubtext: {
    color: "#8E8E98",
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 18,
  },

  image: {
    width: "100%",
    height: 280,
  },

  content: {
    padding: 18,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  city: {
    color: "#B8B8C2",
    marginTop: 6,
  },

  commentBox: {
    marginTop: 16,
    backgroundColor: "#11182D",
    borderRadius: 16,
    padding: 12,
  },

  commentLabel: {
    color: colors.primary,
    fontWeight: "700",
    marginBottom: 6,
  },

  commentText: {
    color: "#fff",
  },

  likeBackButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  likeBackText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
