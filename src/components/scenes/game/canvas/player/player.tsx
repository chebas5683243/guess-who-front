import React, { memo, useMemo, useState } from "react";
import { ROOM_DIMENSIONS } from "@/constants/room";
import { useChallenge } from "@/stores/use-challenge-store";
import { cn } from "@/lib/utils";
import { AstronautModel } from "@/components/meshes/astronaut";

interface PlayerProps {
  id: string;
  order: number;
  isAlive: boolean;
  isCaptain: boolean;
  username: string;
  nPlayers: number;
  hideTags: boolean;
  isSelected: boolean;
  color: string;
}

const GAP_BETWEEN_PLAYERS = 0.6;

function PlayerComponent({
  id,
  order,
  isAlive,
  isCaptain,
  username,
  nPlayers,
  hideTags,
  isSelected,
  color,
}: PlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isChallengeSelected = useChallenge((state) => !!state.challenge);
  const selectParticipant = useChallenge((state) => state.selectParticipant);

  const { showGlow, glowColor } = useMemo(
    () => ({
      showGlow: isHovered || isSelected,
      glowColor: isSelected ? "orange" : "#00ffff",
    }),
    [isHovered, isSelected]
  );

  const position: [number, number, number] = useMemo(
    () => [
      -GAP_BETWEEN_PLAYERS * (order - (nPlayers + 1) / 2),
      -ROOM_DIMENSIONS.HEIGHT / 2,
      -ROOM_DIMENSIONS.WIDTH / 4,
    ],
    [order, nPlayers]
  );

  const xRotation = useMemo(
    () => (isAlive ? -Math.PI / 2 : -Math.PI),
    [isAlive]
  );

  function onSelectPlayer() {
    if (!isAlive || !isChallengeSelected) return;
    selectParticipant(id);
  }

  return (
    <AstronautModel
      animate={isAlive}
      onClick={onSelectPlayer}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={position}
      rotation={[xRotation, 0, 0]}
      color={color}
    >
      {/* Player name and status */}
      {!hideTags && (
        <AstronautModel.Html position="top">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black] whitespace-nowrap">
              {username}
            </h3>
            <div
              className={cn(
                "text-xs px-1 rounded text-white whitespace-nowrap",
                isAlive ? "bg-green-500" : "bg-red-500"
              )}
            >
              {isAlive ? "ALIVE" : "DEAD"}
            </div>
          </div>
        </AstronautModel.Html>
      )}

      {/* Captain tag */}
      {!hideTags && isCaptain && (
        <AstronautModel.Html position="bottom">
          <div className="flex items-center justify-center">
            <h3 className="text-xs px-1 rounded-full bg-orange-500 text-white whitespace-nowrap">
              Captain
            </h3>
          </div>
        </AstronautModel.Html>
      )}

      {/* Hover effects */}
      <AstronautModel.Glow active={showGlow && isAlive} color={glowColor} />
    </AstronautModel>
  );
}

export const Player = memo(PlayerComponent);
