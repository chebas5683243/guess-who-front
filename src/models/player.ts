import { PLAYER_COLORS, PlayerColor } from "@/constants/player-colors";
import { generateRandomBoolean, generateRandomUsername } from "@/utils/random";
import { uuid } from "@/utils/uuid";

export interface Player {
  id: string;
  username: string;
  isCaptain: boolean;
  isDead: boolean;
  order: number;
  color: PlayerColor;
}

export function generateRandomPlayer(attr: Partial<Player>): Player {
  const isDead = generateRandomBoolean();

  return {
    id: uuid(),
    isDead: isDead,
    username: generateRandomUsername(),
    order: attr.order ?? 1,
    isCaptain: false,
    color: attr.color ?? PLAYER_COLORS[0],
  };
}

export function generateRandomPlayers(length: number = 10) {
  const players = Array(length)
    .fill(0)
    .map((_, index) =>
      generateRandomPlayer({ order: index + 1, color: PLAYER_COLORS[index] })
    );

  const alivePlayers = players.filter((p) => !p.isDead);
  alivePlayers[0].isCaptain = true;
  console.log(players);

  return players;
}
