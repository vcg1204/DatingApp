import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Swiper from "react-native-deck-swiper";

import { useEffect, useMemo, useRef, useState } from "react";

import { router } from "expo-router";

import DiscoverCard from "../../components/DiscoverCard";

import CommentBar from "../../components/CommentBar";

import AppHeader from "../../components/AppHeader";

import MatchModal from "../../components/MatchModal";

import { useMatchStore } from "../../store/useMatchStore";

import { useUserStore } from "../../store/useUserStore";

import colors from "../../constants/colors";

import { createLike, createMatch } from "../../services/matchService";

import { getUsers } from "../../services/userFetchService";

export default function DiscoverScreen() {
  const swiperRef = useRef<any>(null);

  const [profiles, setProfiles] = useState<any[]>([]);

  const [comment, setComment] = useState("");

  const [matchVisible, setMatchVisible] = useState(false);

  const [matchedProfile, setMatchedProfile] = useState<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await getUsers();

      setProfiles(users || []);
    } catch (error) {
      console.log(error);

      setProfiles([]);
    }
  };

  const interestedIn = useUserStore((state) => state.interestedIn);

  const userScore = useUserStore((state) => state.faceMatchScore);

  const isPremium = useUserStore((state) => state.isPremium);

  const userId = useUserStore((state) => state.userId);

  const dailySwipesUsed = useUserStore((state) => state.dailySwipesUsed);

  const incrementSwipe = useUserStore((state) => state.incrementSwipe);

  const swipeLimit = isPremium ? 100 : 30;

  const swipeLimitReached = dailySwipesUsed >= swipeLimit;

  const likedProfiles = useMatchStore((state) => state.likedProfiles);

  const passedProfiles = useMatchStore((state) => state.passedProfiles);

  const likeProfile = useMatchStore((state) => state.likeProfile);

  const passProfile = useMatchStore((state) => state.passProfile);

  const addMatch = useMatchStore((state) => state.addMatch);

  const filteredProfiles = useMemo(() => {
    const swipedIds = [
      ...likedProfiles.map((p) => p.profileId),

      ...passedProfiles,
    ];

    return profiles.filter((profile) => {
      if (!profile) return false;

      if (profile.id === userId) {
        return false;
      }

      if (swipedIds.includes(profile.id)) {
        return false;
      }

      if (interestedIn === "Men" && profile.gender !== "Man") {
        return false;
      }

      if (interestedIn === "Women" && profile.gender !== "Woman") {
        return false;
      }

      const scoreDiff = profile.face_match_score - userScore;

      if (!isPremium) {
        return scoreDiff <= 0.5;
      }

      return scoreDiff <= 3;
    });
  }, [
    profiles,
    interestedIn,
    userScore,
    isPremium,
    likedProfiles,
    passedProfiles,
    userId,
  ]);

  const handleSwipeRight = async (cardIndex: number) => {
    if (swipeLimitReached) {
      return;
    }

    const profile = filteredProfiles[cardIndex];

    if (!profile) return;

    incrementSwipe();

    likeProfile(profile.id, comment.trim());

    console.log("USER ID:", userId);

    console.log("PROFILE ID:", profile.id);

    const result = await createLike(userId, profile.id, comment.trim());

    console.log("RESULT:", result);

    setComment("");

    const matched = Math.random() > 0.5;

    if (matched) {
      addMatch(profile.id);

      await createMatch(userId, profile.id);

      setMatchedProfile(profile);

      setMatchVisible(true);
    }
  };

  const handleSwipeLeft = (cardIndex: number) => {
    if (swipeLimitReached) {
      return;
    }

    const profile = filteredProfiles[cardIndex];

    if (!profile) return;

    incrementSwipe();

    passProfile(profile.id);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container} edges={["top"]}>
        <AppHeader title="FaceMatch" />

        <View style={styles.limitRow}>
          <Text style={styles.limitText}>
            {swipeLimit - dailySwipesUsed} swipes left today
          </Text>

          {!isPremium && (
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumText}>Premium</Text>
            </TouchableOpacity>
          )}
        </View>

        {swipeLimitReached ? (
          <View style={styles.lockContainer}>
            <Text style={styles.lockTitle}>Out of swipes</Text>

            <Text style={styles.lockSubtitle}>
              Come back tomorrow or upgrade to Premium.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.swiperArea}>
              <Swiper
                ref={swiperRef}
                cards={filteredProfiles}
                backgroundColor="transparent"
                stackSize={2}
                stackScale={4}
                animateCardOpacity
                disableTopSwipe
                disableBottomSwipe
                verticalSwipe={false}
                cardVerticalMargin={0}
                cardHorizontalMargin={0}
                outputRotationRange={["-2deg", "0deg", "2deg"]}
                onSwipedRight={handleSwipeRight}
                onSwipedLeft={handleSwipeLeft}
                renderCard={(card) => {
                  if (!card) return null;

                  return (
                    <DiscoverCard
                      profile={{
                        ...card,

                        name: card.full_name,

                        faceMatchScore: card.face_match_score,
                      }}
                    />
                  );
                }}
              />
            </View>

            <View style={styles.commentWrapper}>
              <CommentBar value={comment} onChangeText={setComment} />
            </View>
          </>
        )}

        <MatchModal
          visible={matchVisible}
          profile={{
            ...matchedProfile,

            name: matchedProfile?.full_name,

            faceMatchScore: matchedProfile?.face_match_score,
          }}
          onClose={() => setMatchVisible(false)}
          onChat={() => {
            setMatchVisible(false);

            router.push("/(tabs)/messages");
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#050816",
  },

  limitRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 20,

    marginTop: 10,
  },

  limitText: {
    color: "#B8B8C2",

    fontSize: 14,
  },

  premiumButton: {
    backgroundColor: colors.primary,

    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 999,
  },

  premiumText: {
    color: "#fff",

    fontWeight: "700",
  },

  swiperArea: {
    flex: 1,

    marginTop: 8,

    marginBottom: 54,
  },

  commentWrapper: {
    paddingHorizontal: 18,

    paddingBottom: 110,

    backgroundColor: "#050816",

    zIndex: 999,
  },

  lockContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 32,
  },

  lockTitle: {
    color: "#fff",

    fontSize: 30,

    fontWeight: "700",

    textAlign: "center",
  },

  lockSubtitle: {
    color: "#B8B8C2",

    textAlign: "center",

    lineHeight: 24,

    marginTop: 14,

    fontSize: 16,
  },
});
