import { useGameStore } from "@/stores/use-game-store"
import { Suspense } from "react"
import { useModal } from "@/stores/use-modal-store"
import { Player } from "./player"

export function PlayersGroup() {
  const players = useGameStore((state) => state.players)
  const selectedPlayers = useGameStore(state => state.selectedPlayers)
  const anyModalOpen = useModal((state) => state.isOpen)

  return (
    <>
      {players.map(player => {
        const isSelected = selectedPlayers.some(sp => sp === player.id)

        return (
          <Suspense key={player.id} fallback={null}>
            <Player
              id={player.id}
              order={player.order}
              isDead={player.isDead}
              username={player.username}
              nPlayers={players.length}
              isCaptain={player.isCaptain}
              hideTags={anyModalOpen}
              isSelected={isSelected}
              color={player.color}
            />
          </Suspense>
        )
      })}
    </>
  )
}