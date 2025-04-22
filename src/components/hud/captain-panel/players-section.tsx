import { useGameStore } from "@/stores/use-game-store";
import { PanelSection } from "./panel-section";

export function PlayersSection() {
  const selectedPlayers = useGameStore(state => state.selectedPlayers)
  const players = useGameStore(state => state.players)

  return (
    <PanelSection>
      <PanelSection.Title text="Selected Players" />
      <div className="grid grid-cols-2 grid-rows-2">
        {selectedPlayers.length > 0 ? (
          selectedPlayers.map((selectedPlayerId) => {
            const player = players.find(p => p.id === selectedPlayerId)
            if (!player) return null;
            return (
              <PanelSection.Description key={player.id} text={player.username} />
            )
          })
        ) : (
          <PanelSection.Placeholder text="No players selected" />
        )}
      </div>
    </PanelSection>
  )
}