import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import colors from "../constants/colors";

type Props = {
  visible: boolean;

  profile: any;

  onClose: () => void;

  onChat: () => void;
};

export default function MatchModal({
  visible,
  profile,
  onClose,
  onChat,
}: Props) {
  if (!profile) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>It’s a Match 🎉</Text>

          <Text style={styles.subtitle}>
            You and {profile.name} liked each other.
          </Text>

          <View style={styles.imagesRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              }}
              style={styles.image}
            />

            <Image
              source={{
                uri: profile.image,
              }}
              style={styles.image}
            />
          </View>

          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <Text style={styles.chatText}>Start Chatting</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.keepButton} onPress={onClose}>
            <Text style={styles.keepText}>Keep Swiping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.85)",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 24,
  },

  content: {
    width: "100%",

    backgroundColor: "#0F172A",

    borderRadius: 32,

    padding: 28,

    alignItems: "center",
  },

  title: {
    color: "#fff",

    fontSize: 36,

    fontWeight: "800",
  },

  subtitle: {
    color: "#B8B8C2",

    textAlign: "center",

    marginTop: 14,

    lineHeight: 24,

    fontSize: 16,
  },

  imagesRow: {
    flexDirection: "row",

    marginTop: 34,
  },

  image: {
    width: 110,

    height: 110,

    borderRadius: 999,

    marginHorizontal: 10,

    borderWidth: 3,

    borderColor: colors.primary,
  },

  chatButton: {
    width: "100%",

    height: 58,

    borderRadius: 18,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 34,
  },

  chatText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "700",
  },

  keepButton: {
    marginTop: 18,
  },

  keepText: {
    color: "#B8B8C2",

    fontSize: 15,

    fontWeight: "600",
  },
});
