import { PanelSection } from "./panel-section";
import { StarcraftCheckbox } from "@/components/ui/starcraft-checkbox";
import { useChallenge } from "@/stores/use-challenge-store";

interface SummarySectionProps {
  onLaunchChallenge: () => void;
}

export function SummarySection({ onLaunchChallenge }: SummarySectionProps) {
  const challenge = useChallenge((state) => state.challenge);
  const participantsId = useChallenge((state) => state.participantsId);

  const isChallengeSelected = !!challenge;
  const arePlayersSelected = challenge?.nPlayers === participantsId.length;
  const canStartChallenge = isChallengeSelected && arePlayersSelected;

  return (
    <PanelSection>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StarcraftCheckbox checked={isChallengeSelected} />
            <PanelSection.Subtitle text="Challenge" className="capitalize" />
          </div>
          <div className="flex items-center gap-2">
            <StarcraftCheckbox checked={arePlayersSelected} />
            <PanelSection.Subtitle text="Players" className="capitalize" />
          </div>
        </div>
        <PanelSection.Button
          variant="primary"
          text="Launch challenge"
          onClick={onLaunchChallenge}
          disabled={!canStartChallenge}
        />
      </div>
    </PanelSection>
  );
}
