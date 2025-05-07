import { GameCanvas } from "./canvas/canvas";
import { ControlPanel } from "./hud/control-panel/control-panel";
import { DaysIndicator } from "./hud/days-indicator";

export function GameScene() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Ambient overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
      </div>

      <GameCanvas />

      {/* Game HUD */}
      <ControlPanel />
      <DaysIndicator />
    </div>
  );
}
