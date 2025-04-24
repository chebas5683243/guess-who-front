import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "../ui/dialog"
import { StarcraftButton } from "../ui/starcraft-button"
import { useModal } from "@/stores/use-modal-store"
import { useGameStore } from "@/stores/use-game-store"
import { Challenge } from "@/models/challenge"
import { SketchCanvas } from "./sketch-canvas"

export function NewChallengeModal() {
  const { type, isOpen, onClose } = useModal()
  const selectedChallenge = useGameStore(state => state.selectedChallenge)
  const challenges = useGameStore(state => state.challenges)

  const isModalOpen = isOpen && type === "newChallenge"
  const challenge = challenges.find((c: Challenge) => c.id === selectedChallenge)

  if (!challenge) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="bg-black/90 border-2 border-cyan-500/20 p-4 w-[800px] sm:max-w-[900px] backdrop-blur-md z-[100] select-none">
        <DialogHeader className="border-b-2 border-cyan-500/20 pb-2">
          <DialogTitle className="text-xl font-starcraft tracking-wider text-cyan-300">
            {challenge.name.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Challenge Info */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-starcraft tracking-wider text-cyan-400/80">
              {challenge.tagline.toUpperCase()}
            </p>
            <p className="text-sm font-starcraft tracking-wider text-cyan-500/60">
              {challenge.description}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px bg-cyan-500/20" />

          {/* Drawing Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-starcraft tracking-wider text-cyan-300">
              DRAW YOUR PROMPT
            </h3>
            <div className="w-full h-[400px] bg-black/60 border-2 border-cyan-500/20 rounded-lg overflow-hidden">
              <SketchCanvas />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <StarcraftButton
              size="sm"
              variant="secondary"
              onClick={onClose}
            >
              CANCEL
            </StarcraftButton>
            <StarcraftButton
              size="sm"
              variant="primary"
              onClick={() => {
                // TODO: Handle drawing submission
                onClose()
              }}
            >
              SUBMIT
            </StarcraftButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 