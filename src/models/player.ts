import { generateRandomBoolean, generateRandomUsername } from "@/utils/random";
import { uuid } from "@/utils/uuid";

export interface Player {
  id: string;
  username: string;
  isCaptain: boolean;
  isDead: boolean;
  order: number;
}

export function generateRandomPlayer(order?: number) {
  const isDead = generateRandomBoolean();
  const isCaptain = isDead ? false : generateRandomBoolean();

  return {
    id: uuid(),
    isDead: isDead,
    username: generateRandomUsername(),
    order: order ?? 1,
    isCaptain: isCaptain,
  } satisfies Player;
}

export function generateRandomPlayers(length: number = 10) {
  return Array(length)
    .fill(0)
    .map((_, index) => generateRandomPlayer(index + 1));
}
