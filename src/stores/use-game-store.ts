import { generateRandomPlayers, Player } from "@/models/player";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useModal } from "./use-modal-store";
import { Challenge, generateChallenges } from "@/models/challenge";

interface GameState {
  players: Player[];
  nPlayers: number;
  currentDay: number;
  isGameStarted: boolean;
  challenges: Challenge[];

  selectedPlayers: string[];
  selectedChallenge: string;
  maxPlayersPerChallenge: number;
}

interface GameActions {
  // Dev tools actions
  goToFirstDay: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;

  updateChallenge: (challengeId: string) => void;
  selectPlayer: (playerId: string) => void;
  startChallenge: () => void;
}

const PLAYERS_NUMBER = 10;

function getMaxPlayersPerChallenge(nPlayers: number) {
  if (nPlayers <= 5) return 2;
  if (nPlayers <= 8) return 3;
  return 4;
}

export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => ({
    players: generateRandomPlayers(PLAYERS_NUMBER),
    nPlayers: PLAYERS_NUMBER,
    currentDay: PLAYERS_NUMBER,
    selectedPlayers: [],
    selectedChallenge: "",
    isGameStarted: false,
    maxPlayersPerChallenge: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    challenges: generateChallenges(),

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

        if (state.maxPlayersPerChallenge === state.selectedPlayers.length) {
          return;
        }

        state.selectedPlayers.push(playerId);
      }),

    startChallenge: () => {
      useModal.getState().onOpen({
        modalType: "newChallenge",
        data: {
          challenge: get().selectedChallenge,
        },
      });
    },
  }))
);
