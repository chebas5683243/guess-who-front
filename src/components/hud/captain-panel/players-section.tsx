import { PanelSection } from "./panel-section";
import { usePlayers } from "@/stores/use-players-store";
import { useChallenge } from "@/stores/use-challenge-store";
import { useMemo } from "react";

export function PlayersSection() {
  const players = usePlayers((state) => state.players);
  const challenge = useChallenge((state) => state.challenge);
  const participantsId = useChallenge((state) => state.participantsId);
  const sectionTitle = useMemo(() => {
    if (!challenge) return "Selected players";
    return `Selected Players (${participantsId.length}/${challenge.nPlayers})`;
  }, [participantsId, challenge]);

  return (
    <PanelSection>
      <PanelSection.Title text={sectionTitle} />
      {participantsId.length > 0 ? (
        <div className="grid grid-cols-2 grid-rows-2">
          {participantsId.map((participantId) => {
            const player = players.find((p) => p.id === participantId);
            if (!player) return null;
            return (
              <PanelSection.Description
                key={player.id}
                text={player.username}
              />
            );
          })}
        </div>
      ) : (
        <>
          <PanelSection.Placeholder text="No players selected" />
          <PanelSection.Description
            className="normal-case italic opacity-70"
            text="Select them by clicking them. Select them by clicking them"
          />
        </>
      )}
    </PanelSection>
  );
}
