import { generateRandomPlayers, Player } from "@/models/player";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameState {
  players: Player[];
  nPlayers: number;
  currentDay: number;
  selectedPlayers: string[];
  selectedTask: string;
  isGameStarted: boolean;
}

interface GameActions {
  // Dev tools actions
  goToFirstDay: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
  // Add your game actions here
}

const PLAYERS_NUMBER = 10;

export const useGameStore = create<GameState & GameActions>()(
  immer((set) => ({
    players: generateRandomPlayers(PLAYERS_NUMBER),
    nPlayers: PLAYERS_NUMBER,
    currentDay: PLAYERS_NUMBER,
    selectedPlayers: [],
    selectedTask: "",
    isGameStarted: false,

    goToFirstDay: () =>
      set((state) => {
        state.currentDay = 1;
      }),

    goToNextDay: () =>
      set((state) => {
        if (state.currentDay === state.nPlayers) return;
        state.currentDay += 1;
      }),

    goToPreviousDay: () =>
      set((state) => {
        if (state.currentDay === 1) return;
        state.currentDay -= 1;
      }),

    // Add your game actions here
  }))
);
