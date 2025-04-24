import { useGameStore } from "@/stores/use-game-store";
import { PanelSection } from "./panel-section";

export function PlayersSection() {
  const selectedPlayers = useGameStore(state => state.selectedPlayers)
  const maxPlayersPerChallenge = useGameStore(state => state.maxPlayersPerChallenge)
  const players = useGameStore(state => state.players)

  return (
    <PanelSection>
      <PanelSection.Title text={"Selected Players (" + selectedPlayers.length + "/" + maxPlayersPerChallenge + ")"} />
      {selectedPlayers.length > 0 ?
        <div className="grid grid-cols-2 grid-rows-2">
          {
            selectedPlayers.map((selectedPlayerId) => {
              const player = players.find(p => p.id === selectedPlayerId)
              if (!player) return null;
              return (
                <PanelSection.Description key={player.id} text={player.username} />
              )
            })
          }
        </div>
        :
        <>
          <PanelSection.Placeholder text="No players selected" />
          <PanelSection.Description className="normal-case italic opacity-70" text="Select them by clicking them. Select them by clicking them" />
        </>
      }
    </PanelSection>
  )
}