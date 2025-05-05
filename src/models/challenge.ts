import { PLAYERS_NUMBER } from "@/constants/game";

export interface Challenge {
  id: string;
  name: string;
  description: string;
  tagline: string;
  nPlayers: number;
}

function getMaxPlayersPerChallenge(nPlayers: number) {
  if (nPlayers <= 5) return 2;
  if (nPlayers <= 8) return 3;
  return 4;
}

export function generateChallenges() {
  return [
    {
      id: "DRAWCEPTION",
      name: "Drawception",
      description:
        "Everyone draws their prompt. But aliens got a slightly different one. The truth is in the details",
      tagline: "Same… but different",
      nPlayers: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    },
    {
      id: "CIPHER_TALK",
      name: "Signal Sketch",
      description:
        "Everyone gets a category. Only humans get the word. Describe the word—be too precise, and aliens might guess it; be too cryptic, and humans might doubt you.",
      tagline: "Walk the line. Signal your team. Outsmart the enemy.",
      nPlayers: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    },
    {
      id: "GUESSIMATE",
      name: "Guessimate",
      description:
        "Aliens blend in. Humans aim with precision. The category is shared. The number is secret. Write a word that fits both… or fake it well.",
      tagline: "Fake it 'til you rank it.",
      nPlayers: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    },
    {
      id: "BLIND_ANSWER",
      name: "Blind answer",
      description:
        "Everyone gets three answers. Only humans get the prompt. Can aliens reverse-engineer the question?",
      tagline: "Answers speak louder than prompts.",
      nPlayers: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    },
    {
      id: "DILEMMA_QUEST",
      name: "Dilemma Quest",
      description:
        "You're presented with a dilemma, and three options are on the table. The aliens only get the options—will they guess the right answer?",
      tagline: "Hard… isn't it?",
      nPlayers: getMaxPlayersPerChallenge(PLAYERS_NUMBER),
    },
  ] satisfies Challenge[];
}
