import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../constants/colors";
import { useUserStore } from "../../store/useUserStore";

export default function ProfileScreen() {
  const fullName = useUserStore((state) => state.fullName);
  const height = useUserStore((state) => state.height);
  const datingIntention = useUserStore((state) => state.datingIntention);
  const photos = useUserStore((state) => state.photos);
  const faceMatchScore = useUserStore((state) => state.faceMatchScore);
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = () => {
    resetUser();

    setTimeout(() => {
      router.replace("/welcome");
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri:
              photos?.[0] ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          }}
          style={styles.mainImage}
        />

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{fullName || "Your Name"}</Text>

            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{faceMatchScore}</Text>
            </View>
          </View>

          <Text style={styles.meta}>{height || "—"}</Text>

          <View style={styles.intentBadge}>
            <Text style={styles.intentText}>
              {datingIntention || "No intention selected"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Photos</Text>

          <View style={styles.grid}>
            {photos?.map((photo, index) => (
              <View key={`${photo}-${index}`} style={styles.photoWrapper}>
                <Image
                  source={{ uri: photo }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.85}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  mainImage: {
    width: "100%",
    height: 420,
  },

  info: {
    padding: 24,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },

  scoreBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },

  scoreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  meta: {
    color: "#B8B8C2",
    marginTop: 10,
    fontSize: 16,
  },

  intentBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 18,
  },

  intentText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  section: {
    paddingHorizontal: 24,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  photoWrapper: {
    width: "31%",
  },

  gridImage: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    backgroundColor: "#222",
  },

  logoutButton: {
    height: 58,
    marginHorizontal: 24,
    borderRadius: 18,
    backgroundColor: "#1A1A22",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  logoutText: {
    color: "#FF4D67",
    fontSize: 16,
    fontWeight: "700",
  },
});
