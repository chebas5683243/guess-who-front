"use client";

import { GameScene } from "@/components/scenes/game/scene";
import { LobbyScene } from "@/components/scenes/lobby/scene";
import { useGame } from "@/stores/use-game-store";

export default function GamePage() {
  const gameStatus = useGame((state) => state.status);

  if (gameStatus === "lobby") {
    return <LobbyScene />;
  }

  return <GameScene />;
}
