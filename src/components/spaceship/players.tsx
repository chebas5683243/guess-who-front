import { useGameStore } from "@/stores/use-game-store"
import { Suspense } from "react"
import { PlayerModel } from "./player-model"
import { useModal } from "@/stores/use-modal-store"

export function Players() {
  const players = useGameStore((state) => state.players)
  const anyModalOpen = useModal((state) => state.isOpen)

  return (
    <>
      {players.map(player => (
        <Suspense key={player.id} fallback={null}>
          <PlayerModel
            id={player.id}
            order={player.order}
            isDead={player.isDead}
            username={player.username}
            nPlayers={players.length}
            isCaptain={player.isCaptain}
            hideTags={anyModalOpen}
          />
        </Suspense>
      ))}
    </>
  )
}