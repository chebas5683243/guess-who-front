import { PanelSection } from "./panel-section";
import { useModal } from "@/stores/use-modal-store";
import { useChallenge } from "@/stores/use-challenge-store";

export function ChallengeSection() {
  const { onOpen } = useModal();
  const challenge = useChallenge((state) => state.challenge);

  function handleSelectChallenge() {
    onOpen({ modalType: "selectChallenge" });
  }

  return (
    <PanelSection>
      <PanelSection.Title text="Current Challenge" />
      <div className="flex flex-col flex-1 justify-between">
        {challenge ? (
          <>
            <PanelSection.Subtitle text={challenge.name} />
            <PanelSection.Description text={challenge.tagline} />
          </>
        ) : (
          <PanelSection.Placeholder text="No challenge selected yet" />
        )}
        <PanelSection.Button
          onClick={handleSelectChallenge}
          text={challenge ? "MODIFY CHALLENGE" : "SELECT CHALLENGE"}
        />
      </div>
    </PanelSection>
  );
}
