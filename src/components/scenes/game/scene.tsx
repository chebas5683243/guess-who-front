import { GameCanvas } from "./canvas/canvas";
import { ControlPanel } from "./hud/control-panel/control-panel";
import { DaysIndicator } from "./hud/days-indicator";

export function GameScene() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <GameCanvas />

      {/* Game HUD */}
      <ControlPanel />
      <DaysIndicator />
    </div>
  );
}
