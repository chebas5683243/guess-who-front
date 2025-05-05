import { PLAYERS_NUMBER } from "@/constants/game";
import { generateRandomPlayers, Player } from "@/models/player";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PlayersState {
  players: Player[];
  me: Player;
}

interface PlayersAction {
  addPlayer: (player: Player) => void;
  setImpostor: (impostorsId: string[]) => void;
  killPlayer: (playerId: string) => void;
  setCaptain: (playerId: string) => void;
  resetPlayers: () => void;
}

const players = generateRandomPlayers(PLAYERS_NUMBER);

export const usePlayers = create<PlayersState & PlayersAction>()(
  immer((set) => ({
    players,
    me: players[0],

    addPlayer: (player: Player) =>
      set((state) => {
        state.players.push(player);
      }),

    killPlayer: (playerId: string) =>
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.isAlive = false;
        }
      }),

    resetPlayers: () => set((state) => (state.players = [])),

    setCaptain: (playerId: string) =>
      set((state) => {
        for (const player of state.players) {
          const isCaptain = player.id === playerId;
          player.isCaptain = isCaptain;
        }
      }),

    setImpostor: (impostorsId: string[]) =>
      set((state) => {
        for (const player of state.players) {
          player.isImpostor = impostorsId.includes(player.id);
        }
      }),
  }))
);
