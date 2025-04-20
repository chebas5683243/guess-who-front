import { memo } from "react";
import { SpaceshipWall } from "./spaceship-wall";
import { Players } from "./players";

export const ROOM_HEIGHT = 3
export const ROOM_WIDTH = 8
const ROOM_DEPTH = 6
const Y_DELTA_FROM_CAMERA = 0.4

function MainRoomComponent() {
  return (
    <group position={[0, ROOM_HEIGHT / 2 - Y_DELTA_FROM_CAMERA, 0]}>
      {/* Left Wall */}
      <SpaceshipWall
        color="white"
        position={[ROOM_WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DEPTH, ROOM_HEIGHT]}
      />
      {/* Rigth Wall */}
      <SpaceshipWall
        color="white"
        position={[-ROOM_WIDTH / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[ROOM_DEPTH, ROOM_HEIGHT]}
      />
      {/* Bottom Wall */}
      <SpaceshipWall
        color="gray"
        position={[0, ROOM_HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_WIDTH, ROOM_DEPTH]}
      />
      {/* Top Wall */}
      <SpaceshipWall
        color="gray"
        position={[0, -ROOM_HEIGHT / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[ROOM_WIDTH, ROOM_DEPTH]}
      />

      <Players />
    </group>
  )
}

export const MainRoom = memo(MainRoomComponent)