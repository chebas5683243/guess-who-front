import { PLAYER_COLORS, PlayerColor } from "@/constants/player-colors";
import { generateRandomUsername } from "@/utils/random";
import { uuid } from "@/utils/uuid";

export interface Player {
  id: string;
  username: string;
  isCaptain: boolean;
  isAlive: boolean;
  order: number;
  color: PlayerColor;
  isImpostor: boolean;
}

export function generateRandomPlayer(attr: Partial<Player>): Player {
  return {
    id: uuid(),
    isAlive: true,
    username: generateRandomUsername(),
    order: attr.order ?? 1,
    isCaptain: false,
    color: attr.color ?? PLAYER_COLORS[0],
    isImpostor: false,
  };
}

export function generateRandomPlayers(length: number = 10) {
  const players = Array(length)
    .fill(0)
    .map((_, index) =>
      generateRandomPlayer({ order: index + 1, color: PLAYER_COLORS[index] })
    );

  return players;
}
