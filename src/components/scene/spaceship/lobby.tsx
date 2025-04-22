import { memo } from "react";
import { SpaceshipWall } from "./wall";
import { PlayersGroup } from "../player/players-group";
import { ROOM_DIMENSIONS } from "@/constants/room";

function LobbyComponent() {
  return (
    <group position={[0, ROOM_DIMENSIONS.HEIGHT / 2 - ROOM_DIMENSIONS.Y_DELTA_FROM_CAMERA, 0]}>
      {/* Left Wall */}
      <SpaceshipWall
        color="white"
        position={[ROOM_DIMENSIONS.WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DIMENSIONS.DEPTH, ROOM_DIMENSIONS.HEIGHT]}
      />
      {/* Rigth Wall */}
      <SpaceshipWall
        color="white"
        position={[-ROOM_DIMENSIONS.WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DIMENSIONS.DEPTH, ROOM_DIMENSIONS.HEIGHT]}
      />
      {/* Bottom Wall */}
      <SpaceshipWall
        color="gray"
        position={[0, ROOM_DIMENSIONS.HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_DIMENSIONS.WIDTH, ROOM_DIMENSIONS.DEPTH]}
      />
      {/* Top Wall */}
      <SpaceshipWall
        color="gray"
        position={[0, -ROOM_DIMENSIONS.HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_DIMENSIONS.WIDTH, ROOM_DIMENSIONS.DEPTH]}
      />

      <PlayersGroup />
    </group>
  )
}

export const Lobby = memo(LobbyComponent)