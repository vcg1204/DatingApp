import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  onboardingCompleted: boolean;

  userId: string;
  fullName: string;
  email: string;
  phone: string;

  gender: string;
  interestedIn: string;
  datingIntention: string;
  height: string;

  city: string;
  bio: string;

  photos: string[];

  faceMatchScore: number;
  isPremium: boolean;

  dailySwipesUsed: number;

  setUserId: (id: string) => void;
  setPhoneNumber: (phone: string) => void;
  setEmail: (email: string) => void;
  setFullName: (name: string) => void;
  setGender: (gender: string) => void;
  setInterestedIn: (value: string) => void;
  setDatingIntention: (value: string) => void;
  setHeight: (value: string) => void;
  setPhotos: (photos: string[]) => void;
  setFaceMatchScore: (score: number) => void;
  setIsLoggedIn: (value: boolean) => void;
  setOnboardingCompleted: (value: boolean) => void;

  incrementSwipe: () => void;
  resetDailySwipes: () => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      onboardingCompleted: false,

      userId: "",
      fullName: "",
      email: "",
      phone: "",

      gender: "",
      interestedIn: "",
      datingIntention: "",
      height: "",

      city: "",
      bio: "",

      photos: [],

      faceMatchScore: 0,
      isPremium: false,

      dailySwipesUsed: 0,

      setUserId: (userId) =>
        set({
          userId,
        }),

      setPhoneNumber: (phone) =>
        set({
          phone,
        }),

      setEmail: (email) =>
        set({
          email,
        }),

      setFullName: (fullName) =>
        set({
          fullName,
        }),

      setGender: (gender) =>
        set({
          gender,
        }),

      setInterestedIn: (interestedIn) =>
        set({
          interestedIn,
        }),

      setDatingIntention: (datingIntention) =>
        set({
          datingIntention,
        }),

      setHeight: (height) =>
        set({
          height,
        }),

      setPhotos: (photos) =>
        set({
          photos,
        }),

      setFaceMatchScore: (faceMatchScore) =>
        set({
          faceMatchScore,
        }),

      setIsLoggedIn: (isLoggedIn) =>
        set({
          isLoggedIn,
        }),

      setOnboardingCompleted: (onboardingCompleted) =>
        set({
          onboardingCompleted,
        }),

      incrementSwipe: () =>
        set((state) => ({
          dailySwipesUsed: state.dailySwipesUsed + 1,
        })),

      resetDailySwipes: () =>
        set({
          dailySwipesUsed: 0,
        }),

      resetUser: () =>
        set({
          isLoggedIn: false,
          onboardingCompleted: false,

          userId: "",
          fullName: "",
          email: "",
          phone: "",

          gender: "",
          interestedIn: "",
          datingIntention: "",
          height: "",

          city: "",
          bio: "",

          photos: [],

          faceMatchScore: 0,
          isPremium: false,

          dailySwipesUsed: 0,
        }),
    }),
    {
      name: "facematch-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
