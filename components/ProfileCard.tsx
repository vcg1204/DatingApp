import { Image, StyleSheet, Text, View } from "react-native";

import colors from "../constants/colors";

import layout from "../constants/layout";

import AppButton from "./AppButton";

import ProfileStatCard from "./ProfileStatCard";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        }}
        style={styles.image}
      />

      <Text style={styles.name}>Sophia, 24</Text>

      <Text style={styles.location}>Mumbai</Text>

      <ProfileStatCard
        title="FaceMatch Score"
        subtitle="Updated 4 days ago"
        value="87"
      />

      <View style={styles.buttonWrapper}>
        <AppButton
          title="Upgrade to Premium"
          icon={<Ionicons name="sparkles" size={16} color="#fff" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,

    borderRadius: layout.radius.xxl,

    padding: 24,

    alignItems: "center",

    marginTop: 4,
  },

  image: {
    width: 110,
    height: 110,

    borderRadius: 34,
  },

  name: {
    color: colors.text,

    fontSize: 30,

    fontWeight: "700",

    marginTop: 18,
  },

  location: {
    color: colors.subText,

    marginTop: 6,

    fontSize: 15,
  },

  buttonWrapper: {
    width: "100%",

    marginTop: 18,
  },
});
