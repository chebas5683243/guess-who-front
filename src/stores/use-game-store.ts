import { generateRandomPlayers, Player } from "@/models/player";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GameState {
  players: Player[];
  nPlayers: number;
  currentDay: number;
  isGameStarted: boolean;

  selectedPlayers: string[];
  selectedChallenge: string;
}

interface GameActions {
  // Dev tools actions
  goToFirstDay: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;

  updateChallenge: (challengeId: string) => void;
  selectPlayer: (playerId: string) => void;
}

const PLAYERS_NUMBER = 10;

export const useGameStore = create<GameState & GameActions>()(
  immer((set) => ({
    players: generateRandomPlayers(PLAYERS_NUMBER),
    nPlayers: PLAYERS_NUMBER,
    currentDay: PLAYERS_NUMBER,
    selectedPlayers: [],
    selectedChallenge: "",
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

    updateChallenge: (challengeId) =>
      set((state) => {
        state.selectedChallenge = challengeId;
      }),

    selectPlayer: (playerId) =>
      set((state) => {
        const alreadySelected = state.selectedPlayers.some(
          (sp) => sp === playerId
        );

        if (alreadySelected) {
          state.selectedPlayers = state.selectedPlayers.filter(
            (sp) => sp !== playerId
          );
          return;
        }

        state.selectedPlayers.push(playerId);
      }),
  }))
);
