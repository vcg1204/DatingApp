import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width - 20;

const CARD_HEIGHT = height * 0.72;

type Props = {
  profile: any;
};

export default function DiscoverCard({ profile }: Props) {
  if (!profile) return null;

  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.image }} style={styles.image} />

      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.08)",
          "rgba(0,0,0,0.45)",
          "rgba(0,0,0,0.92)",
        ]}
        locations={[0, 0.45, 0.7, 1]}
        style={styles.overlay}
      />

      {/* TOP */}

      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Recently Active</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="location" size={12} color="#fff" />

          <Text style={styles.badgeText}>3 km</Text>
        </View>
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>

          <View style={styles.dot} />
        </View>

        <Text style={styles.details}>
          {profile.city} • {profile.height}
        </Text>

        <Text style={styles.intent}>{profile.intention}</Text>

        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.tags}>
          {profile.interests?.map((item: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,

    height: CARD_HEIGHT,

    borderRadius: 34,

    overflow: "hidden",

    alignSelf: "center",

    backgroundColor: "#111",
  },

  image: {
    width: "100%",

    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  topRow: {
    position: "absolute",

    top: 18,

    left: 18,

    right: 18,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  badge: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.28)",

    paddingHorizontal: 14,

    paddingVertical: 9,

    borderRadius: 18,
  },

  badgeText: {
    color: "#fff",

    fontSize: 12,

    fontWeight: "600",

    marginLeft: 4,
  },

  content: {
    position: "absolute",

    left: 24,

    right: 24,

    bottom: 90,
  },

  nameRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  name: {
    color: "#fff",

    fontSize: 32,

    fontWeight: "700",
  },

  dot: {
    width: 12,

    height: 12,

    borderRadius: 999,

    backgroundColor: "#4BE35B",

    marginLeft: 10,
  },

  details: {
    color: "#E2E2E7",

    marginTop: 6,

    fontSize: 16,
  },

  intent: {
    color: "#FF7E9D",

    fontSize: 16,

    fontWeight: "600",

    marginTop: 14,
  },

  bio: {
    color: "#F5F5F7",

    fontSize: 15,

    lineHeight: 23,

    marginTop: 12,
  },

  tags: {
    flexDirection: "row",

    flexWrap: "wrap",

    marginTop: 18,
  },

  tag: {
    backgroundColor: "rgba(255,255,255,0.15)",

    paddingHorizontal: 14,

    paddingVertical: 9,

    borderRadius: 18,

    marginRight: 8,

    marginBottom: 8,
  },

  tagText: {
    color: "#fff",

    fontSize: 12,

    fontWeight: "600",
  },
});
