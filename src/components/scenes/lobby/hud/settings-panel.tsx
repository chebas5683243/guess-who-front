import { PLAYER_COLORS, PlayerColor } from "@/constants/player-colors";
import { usePlayers } from "@/stores/use-players-store";
import { useState } from "react";
import { TimeLimitPicker } from "./time-limit-picker";
import { useGame } from "@/stores/use-game-store";
import { StarcraftButton } from "@/components/ui/starcraft-button";

export function SettingsPanel() {
  const players = usePlayers((state) => state.players);
  const me = usePlayers((state) => state.me);
  const updatePlayerColor = usePlayers((state) => state.updatePlayerColor);

  const game = useGame((state) => state);

  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const usedColors = players.map((player) => player.color);

  function onPlayerColorChange(color: PlayerColor) {
    setColorPickerOpen(false);
    updatePlayerColor(me.id, color);
  }

  function onStartGame() {
    game.startGame();
  }

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-72">
      <div className="backdrop-blur-[0.4px] bg-black/30 border-2 border-cyan-500/20 p-4">
        <h2 className="font-starcraft text-cyan-300 text-xl mb-3 tracking-wider">
          SETTINGS
        </h2>
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-4" />

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block font-starcraft text-xs text-cyan-400">
              YOUR COLOR
            </label>
            <div
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="w-full px-3 py-2 bg-black/80 border-2 border-cyan-500/30 text-cyan-300 font-starcraft text-sm flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-5 h-5 rounded-sm"
                  style={{ backgroundColor: me?.color || "#FFFFFF" }}
                />
                <span>SELECTED</span>
              </div>
              <span className="text-cyan-500">◢</span>
            </div>

            {colorPickerOpen && (
              <div className="mt-2 p-3 bg-black/90 border-2 border-cyan-500/30 grid grid-cols-6 gap-2">
                {PLAYER_COLORS.map((color) => {
                  const isUsed = usedColors.includes(color);
                  const isMine = me?.color === color;

                  return (
                    <div
                      key={color}
                      className={`
                        w-8 h-8 rounded-sm cursor-pointer
                        border-2 
                        ${
                          isMine
                            ? "border-white"
                            : isUsed
                            ? "border-red-500/50 opacity-50"
                            : "border-transparent hover:border-cyan-500"
                        }
                      `}
                      style={{ backgroundColor: color }}
                      onClick={() => !isUsed && onPlayerColorChange(color)}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="block font-starcraft text-xs text-cyan-400">
              GAME MODE
            </label>
            <select className="w-full px-3 py-2 bg-black/80 border-2 border-cyan-500/30 text-cyan-300 font-starcraft text-sm">
              <option>CLASSIC</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-starcraft text-xs text-cyan-400">
              # HACKS
            </label>
            <select className="w-full px-3 py-2 bg-black/80 border-2 border-cyan-500/30 text-cyan-300 font-starcraft text-sm">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <TimeLimitPicker
            label="DISCUSSION TIME"
            value={game.discussionTime}
            onChange={(value) => game.setDiscussionTime(value)}
          />

          <TimeLimitPicker
            label="PROPOSAL TIME"
            value={game.proposalTime}
            onChange={(value) => game.setProposalTime(value)}
          />

          <TimeLimitPicker
            label="VOTING TIME"
            value={game.votingTime}
            onChange={(value) => game.setVotingTime(value)}
          />

          <div className="pt-2">
            <StarcraftButton
              className="w-full"
              variant="primary"
              onClick={onStartGame}
            >
              START GAME
            </StarcraftButton>
          </div>
        </div>
      </div>
    </div>
  );
}
