import { memo } from "react";
import { ROOM_DIMENSIONS } from "@/constants/room";
import { Wall } from "@/components/meshes/wall";
import { PlayersGroup } from "./player/players-group";

function SpaceshipComponent() {
  return (
    <group
      position={[
        0,
        ROOM_DIMENSIONS.HEIGHT / 2 - ROOM_DIMENSIONS.Y_DELTA_FROM_CAMERA,
        0,
      ]}
    >
      {/* Left Wall */}
      <Wall
        color="white"
        position={[ROOM_DIMENSIONS.WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DIMENSIONS.DEPTH, ROOM_DIMENSIONS.HEIGHT]}
      />
      {/* Rigth Wall */}
      <Wall
        color="white"
        position={[-ROOM_DIMENSIONS.WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DIMENSIONS.DEPTH, ROOM_DIMENSIONS.HEIGHT]}
      />
      {/* Bottom Wall */}
      <Wall
        color="gray"
        position={[0, ROOM_DIMENSIONS.HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_DIMENSIONS.WIDTH, ROOM_DIMENSIONS.DEPTH]}
      />
      {/* Top Wall */}
      <Wall
        color="gray"
        position={[0, -ROOM_DIMENSIONS.HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_DIMENSIONS.WIDTH, ROOM_DIMENSIONS.DEPTH]}
      />

      <PlayersGroup />
    </group>
  );
}

export const Spaceship = memo(SpaceshipComponent);
