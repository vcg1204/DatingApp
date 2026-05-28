import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: true,

      onboardingCompleted: true,

      userId: "demo-user",

      fullName: "Vaishvee",

      email: "demo@test.com",

      phone: "9999999999",

      gender: "Woman",

      interestedIn: "Men",

      datingIntention: "Long-term",

      height: "5'5",

      city: "Mumbai",

      bio: "Hey 👋",

      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",

        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      ],

      faceMatchScore: 7.4,

      isPremium: false,

      dailySwipesUsed: 0,

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
    }),

    {
      name: "facematch-user-storage",

      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
