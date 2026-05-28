import { create } from "zustand";

type ChatState = {
  currentMatchId: string;

  setCurrentMatchId: (id: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  currentMatchId: "",

  setCurrentMatchId: (id) =>
    set({
      currentMatchId: id,
    }),
}));
