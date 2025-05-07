import { useModal } from "@/stores/use-modal-store";
import { ChallengeSection } from "./challenge-section";
import { PlayersSection } from "./players-section";
import { SummarySection } from "./summary-section";
import { useState, useEffect } from "react";
import { useChallenge } from "@/stores/use-challenge-store";
import { cn } from "@/lib/utils";

export function ControlPanel() {
  const [isClosing, setIsClosing] = useState(false);
  const startChallenge = useChallenge((state) => state.startChallenge);
  const onOpenModal = useModal((state) => state.onOpen);
  const isChallengeInProgress = useModal(
    (state) => state.type == "newChallenge"
  );

  useEffect(() => {
    if (!isChallengeInProgress) {
      setIsClosing(false);
    }
  }, [isChallengeInProgress]);

  const handleLaunchChallenge = () => {
    setIsClosing(true);
    setTimeout(() => {
      startChallenge();
      onOpenModal({
        modalType: "newChallenge",
      });
    }, 500);
  };

  return (
    <div
      className={cn(
        "absolute w-full bottom-0 left-0 p-4 select-none transition-all duration-500",
        {
          "opacity-0 pointer-events-none": isClosing,
        }
      )}
    >
      <div
        className={cn(
          "relative flex flex-col gap-4 p-4 rounded-lg backdrop-blur-sm bg-black/80 border-2 border-cyan-500/20 z-20",
          {
            "animate-panel-close": isClosing,
          }
        )}
      >
        {/* Scanline effect */}
        {isClosing && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scanline" />
        )}

        {/* Header */}
        <div className="flex gap-2 items-end border-b-2 border-cyan-500/20 pb-2">
          <h2 className="text-2xl font-starcraft tracking-wider text-cyan-300">
            CAPTAIN:
          </h2>
          <h2 className="text-2xl font-starcraft tracking-wider text-cyan-400/80">
            TESTING
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-4 h-40">
          <ChallengeSection />
          <PlayersSection />
          <SummarySection onLaunchChallenge={handleLaunchChallenge} />
        </div>
      </div>
    </div>
  );
}
