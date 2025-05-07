"use client";

import { GameScene } from "@/components/scenes/game/scene";
import { LobbyCanvas } from "@/components/scenes/lobby/canvas";
import { useGame } from "@/stores/use-game-store";

export default function GamePage() {
  const gameStatus = useGame((state) => state.status);

  if (gameStatus === "lobby") {
    return <LobbyCanvas />;
  }

  return <GameScene />;
}
