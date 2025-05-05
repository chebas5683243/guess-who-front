import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { StarcraftButton } from "../ui/starcraft-button";
import { useModal } from "@/stores/use-modal-store";
import { generateChallenges } from "@/models/challenge";
import { useChallenge } from "@/stores/use-challenge-store";

const challenges = generateChallenges();

export function SelectChallengeModal() {
  const { type, isOpen, onClose } = useModal();
  const selectChallenge = useChallenge((state) => state.selectChallenge);

  const isModalOpen = isOpen && type === "selectChallenge";

  function onSelectChallenge(challengeId: string) {
    selectChallenge(challengeId);
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="bg-black/90 border-2 border-cyan-500/20 p-4 w-[800px] sm:max-w-[900px] backdrop-blur-md z-[100] select-none">
        <DialogHeader className="border-b-2 border-cyan-500/20 pb-2">
          <DialogTitle className="text-xl font-starcraft tracking-wider text-cyan-300">
            SELECT CHALLENGE
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 py-4 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-cyan-500/20 [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/30">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="flex flex-col justify-between p-3 rounded-lg border-2 border-cyan-500/20 bg-black/60 hover:border-cyan-500/40 transition-colors min-w-[280px]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-starcraft tracking-wider text-cyan-300">
                    {challenge.name.toUpperCase()}
                  </h3>
                  <p className="text-xs font-starcraft tracking-wider text-cyan-400/80">
                    {challenge.tagline.toUpperCase()}
                  </p>
                </div>
                <p className="text-xs font-starcraft tracking-wider text-cyan-500/60">
                  {challenge.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-starcraft tracking-wider text-cyan-500/60">
                  REQUIRED PLAYERS: {challenge.nPlayers}
                </span>
                <StarcraftButton
                  size="sm"
                  variant="primary"
                  onClick={() => onSelectChallenge(challenge.id)}
                >
                  SELECT
                </StarcraftButton>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
