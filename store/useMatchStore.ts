import { create } from "zustand";

type LikeType = {
  profileId: string;

  comment?: string;
};

type MatchStore = {
  likedProfiles: LikeType[];

  passedProfiles: string[];

  matches: string[];

  likeProfile: (profileId: string, comment?: string) => void;

  passProfile: (id: string) => void;

  addMatch: (id: string) => void;
};

export const useMatchStore = create<MatchStore>((set) => ({
  likedProfiles: [],

  passedProfiles: [],

  matches: [],

  likeProfile: (profileId, comment) =>
    set((state) => ({
      likedProfiles: [
        ...state.likedProfiles,

        {
          profileId,
          comment,
        },
      ],
    })),

  passProfile: (id) =>
    set((state) => ({
      passedProfiles: [...state.passedProfiles, id],
    })),

  addMatch: (id) =>
    set((state) => ({
      matches: [...state.matches, id],
    })),
}));
