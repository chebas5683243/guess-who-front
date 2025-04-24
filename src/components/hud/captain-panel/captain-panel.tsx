import { ChallengeSection } from "./challenge-section"
import { PlayersSection } from "./players-section"
import { SummarySection } from "./summary-section"

export function ControlPanel() {
  return (
    <div className="absolute w-full bottom-0 left-0 p-4 select-none">
      <div className="flex flex-col gap-4 p-4 rounded-lg backdrop-blur-sm bg-black/80 border-2 border-cyan-500/20 z-20">
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
          <SummarySection />
        </div>
      </div>
    </div>
  )
}