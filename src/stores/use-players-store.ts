import { PLAYER_COLORS, PlayerColor } from "@/constants/player-colors";
import { generateRandomPlayer, Player } from "@/models/player";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PlayersState {
  players: Player[];
  me: Player;
}

interface PlayersAction {
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  setImpostor: (impostorsId: string[]) => void;
  killPlayer: (playerId: string) => void;
  setCaptain: (playerId: string) => void;
  resetPlayers: () => void;
  updatePlayerColor: (playerId: string, color: PlayerColor) => void;
}

const me = generateRandomPlayer({ order: 1, color: PLAYER_COLORS[0] });

export const usePlayers = create<PlayersState & PlayersAction>()(
  immer((set) => ({
    players: [me],
    me,

    addPlayer: (player: Player) => {
      set((state) => {
        state.players.push(player);
      });
    },

    removePlayer: (playerId: string) => {
      set((state) => {
        state.players = state.players.filter((p) => p.id !== playerId);
      });
    },

    killPlayer: (playerId: string) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.isAlive = false;
        }
      });
    },

    resetPlayers: () => set((state) => (state.players = [])),

    setCaptain: (playerId: string) => {
      set((state) => {
        for (const player of state.players) {
          player.isCaptain = player.id === playerId;
        }
      });
    },

    setImpostor: (impostorsId: string[]) => {
      set((state) => {
        for (const player of state.players) {
          player.isImpostor = impostorsId.includes(player.id);
        }
      });
    },

    updatePlayerColor: (playerId: string, color: PlayerColor) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.color = color;
          if (playerId === state.me.id) {
            state.me.color = color;
          }
        }
      });
    },
  }))
);
