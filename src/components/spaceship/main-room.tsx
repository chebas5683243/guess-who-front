import { memo, Suspense } from "react";
import { PlayerModel } from "./astronaut";
import { SpaceshipWall } from "./spaceship-wall";
import { CenterDot } from "../center-dot";

export const ROOM_HEIGHT = 3
export const ROOM_WIDTH = 8
const ROOM_DEPTH = 6
// const WINDOW_FRAME = 0.2
// const WINDOW_FRAME_PADDING = 0.1
const Y_DELTA_FROM_CAMERA = 0.4

const players = Array(10).fill(0).map(() => ({ id: crypto.randomUUID() }))

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

      <CenterDot />

      {players.map((player, index) => (
        <Suspense key={player.id} fallback={null}>
          <PlayerModel id={player.id} order={index + 1} />
        </Suspense>
      ))}

      {/* Window frame */}
      {/* <group position={[0, 1.4, 3.8]}> */}
      {/* Top frame */}
      {/* <mesh position={[0, 1.5, 0.1]}>
          <boxGeometry args={[8, 0.2, 0.2]} />
          <meshStandardMaterial
            color={Color.NAMES.aliceblue}
          />
        </mesh> */}
      {/* Bottom frame */}
      {/* <mesh position={[0, -1.5, 0.1]}>
          <boxGeometry args={[8, 0.2, 0.2]} />
          <meshStandardMaterial
            color={Color.NAMES.aliceblue}
          />
        </mesh>
      </group> */}
    </group>
  )
}

export const MainRoom = memo(MainRoomComponent)