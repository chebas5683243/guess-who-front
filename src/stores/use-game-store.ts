import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Challenge, generateChallenges } from "@/models/challenge";

interface GameState {
  currentDay: number;
  totalDays: number;
  status: "lobby" | "gameplay" | "over";
  dayStage: "challenge" | "vote";
  challenges: Challenge[];
}

interface GameActions {
  // Dev tools actions
  goToFirstDay: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
}

export const useGame = create<GameState & GameActions>()(
  immer((set) => ({
    currentDay: 10,
    totalDays: 10,
    challenges: generateChallenges(),
    status: "lobby",
    dayStage: "challenge",

    goToFirstDay: () => {
      set((state) => {
        state.currentDay = 1;
      });
    },

    goToNextDay: () => {
      set((state) => {
        if (state.currentDay === state.totalDays) return;
        state.currentDay += 1;
      });
    },

    goToPreviousDay: () => {
      set((state) => {
        if (state.currentDay === 1) return;
        state.currentDay -= 1;
      });
    },
  }))
);
