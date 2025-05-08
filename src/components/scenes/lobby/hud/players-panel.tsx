import { usePlayers } from "@/stores/use-players-store";

export function PlayersPanel() {
  const players = usePlayers((state) => state.players);
  const removePlayer = usePlayers((state) => state.removePlayer);

  const MAX_SLOTS = 10;
  const emptySlots = Math.max(0, MAX_SLOTS - players.length);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-64">
      <div className="backdrop-blur-[0.4px] bg-black/30 border-2 border-cyan-500/20 p-4">
        <h2 className="font-starcraft text-cyan-300 text-xl mb-3 tracking-wider">
          PLAYERS
        </h2>
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-4" />

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {players.map((player) => (
            <div key={player.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: player.color }}
                />
                <span className="font-starcraft text-sm text-cyan-200">
                  {player.username}
                </span>
              </div>
              <button
                onClick={() => removePlayer(player.id)}
                className="text-red-500 font-bold hover:text-red-400 transition-colors font-starcraft"
              >
                ×
              </button>
            </div>
          ))}

          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-sm bg-gray-800/40 border border-cyan-900/30" />
                <span className="font-starcraft text-sm text-cyan-900/40">
                  [EMPTY SLOT]
                </span>
              </div>
              <span className="w-3.5 opacity-0">×</span>
            </div>
          ))}

          {players.length === 0 && emptySlots === 0 && (
            <p className="text-cyan-500/50 text-sm font-starcraft text-center">
              NO PLAYERS YET
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
