import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../constants/colors";

import profiles from "../../data/profiles";

import { useMatchStore } from "../../store/useMatchStore";

export default function LikesScreen() {
  const likedProfiles = useMatchStore((state) => state.likedProfiles);

  const likedUsers = likedProfiles.map((like) => {
    const profile = profiles.find((p) => p.id === like.profileId);

    return {
      ...profile,

      comment: like.comment,
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Your Likes</Text>

      {likedUsers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No likes yet</Text>

          <Text style={styles.emptySubtext}>Start swiping to like people.</Text>
        </View>
      ) : (
        <FlatList
          data={likedUsers}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          contentContainerStyle={{
            paddingBottom: 140,
          }}
          renderItem={({ item }) => {
            if (!item) return null;

            return (
              <View style={styles.card}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.name}>
                    {item.name}, {item.age}
                  </Text>

                  <Text style={styles.meta}>{item.city}</Text>

                  <Text style={styles.bio}>{item.bio}</Text>

                  {item.comment ? (
                    <View style={styles.commentBox}>
                      <Text style={styles.commentLabel}>Your opener</Text>

                      <Text style={styles.commentText}>“{item.comment}”</Text>
                    </View>
                  ) : null}
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

    fontSize: 15,

    marginTop: 10,
  },

  card: {
    backgroundColor: colors.card,

    borderRadius: 24,

    overflow: "hidden",

    marginBottom: 18,
  },

  image: {
    width: "100%",

    height: 320,
  },

  info: {
    padding: 18,
  },

  name: {
    color: "#fff",

    fontSize: 22,

    fontWeight: "700",
  },

  meta: {
    color: "#B8B8C2",

    marginTop: 6,

    fontSize: 15,
  },

  bio: {
    color: "#E5E5EA",

    marginTop: 12,

    lineHeight: 22,

    fontSize: 15,
  },

  commentBox: {
    marginTop: 18,

    backgroundColor: "#11182D",

    borderRadius: 18,

    padding: 14,
  },

  commentLabel: {
    color: colors.primary,

    fontWeight: "700",

    marginBottom: 8,
  },

  commentText: {
    color: "#fff",

    lineHeight: 22,

    fontSize: 15,
  },
});
