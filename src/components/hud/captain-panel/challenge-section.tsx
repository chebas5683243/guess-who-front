import { useGameStore } from "@/stores/use-game-store";
import { PanelSection } from "./panel-section";
import { useMemo } from "react";
import { generateChallenges } from "@/models/challenge";
import { useModal } from "@/stores/use-modal-store";

export function ChallengeSection() {
  const { onOpen } = useModal()

  const selectedChallenge = useGameStore(state => state.selectedChallenge)
  const challenge = useMemo(() => (
    generateChallenges().find(c => c.id === selectedChallenge)
  ), [selectedChallenge])

  function handleSelectChallenge() {
    onOpen({ modalType: "selectChallenge" })
  }

  return (
    <PanelSection>
      <PanelSection.Title text="Current Challenge" />
      <div className="flex flex-col flex-1 justify-between">
        {challenge ?
          <>
            <PanelSection.Subtitle text={challenge.name} />
            <PanelSection.Description text={challenge.tagline} />
          </>
          :
          <PanelSection.Placeholder text="No challenge selected yet" />
        }
        <PanelSection.Button
          onClick={handleSelectChallenge}
          text={challenge ? "MODIFY CHALLENGE" : "SELECT CHALLENGE"}
        />
      </div>
    </PanelSection>
  )
}