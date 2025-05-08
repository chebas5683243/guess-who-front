import { LobbyCanvas } from "./canvas/canvas";
import { PlayersPanel } from "./hud/players-panel";
import { SettingsPanel } from "./hud/settings-panel";
import { usePlayers } from "@/stores/use-players-store";
import { generateRandomPlayer } from "@/models/player";
import { PLAYER_COLORS } from "@/constants/player-colors";
import { useParams } from "next/navigation";

export function LobbyScene() {
  const players = usePlayers((state) => state.players);
  const addPlayer = usePlayers((state) => state.addPlayer);
  const params = useParams();

  const roomId = (params?.room as string) || "unknown";

  function onAddPlayer() {
    const randomPlayer = generateRandomPlayer({
      order: players.length + 1,
      color: PLAYER_COLORS[players.length],
    });
    addPlayer(randomPlayer);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="px-6 py-3 backdrop-blur-[0.4px] bg-black/30 border-2 border-cyan-500/20">
          <div className="flex flex-col items-center">
            <span className="font-starcraft text-sm text-cyan-400 mb-1">
              ROOM ID
            </span>
            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-2" />
            <span className="font-starcraft text-xl text-cyan-300 tracking-wider">
              {roomId.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <PlayersPanel />
      <SettingsPanel />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={onAddPlayer}
          className="bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-300 font-starcraft px-4 py-2 border-2 border-cyan-500/20"
        >
          ADD TEST PLAYER
        </button>
      </div>

      <LobbyCanvas />
    </div>
  );
}
