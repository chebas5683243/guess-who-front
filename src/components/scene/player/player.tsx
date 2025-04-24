import React, { memo, useMemo, useState } from 'react'
import { ROOM_DIMENSIONS } from '@/constants/room'
import { AstronautModel } from './astronaut'
import { useGameStore } from '@/stores/use-game-store';

interface PlayerProps {
  id: string,
  order: number,
  isDead: boolean,
  isCaptain: boolean,
  username: string,
  nPlayers: number,
  hideTags: boolean,
  isSelected: boolean,
  color: string,
}

const GAP_BETWEEN_PLAYERS = 0.6

function PlayerComponent({ id, order, isDead, isCaptain, username, nPlayers, hideTags, isSelected, color }: PlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const selectPlayer = useGameStore(state => state.selectPlayer)

  const { showGlow, glowColor } = useMemo(() => ({
    showGlow: isHovered || isSelected,
    glowColor: isSelected ? "orange" : "#00ffff"
  }), [isHovered, isSelected])

  const position: [number, number, number] = useMemo(() => (
    [-GAP_BETWEEN_PLAYERS * (order - (nPlayers + 1) / 2), -ROOM_DIMENSIONS.HEIGHT / 2, -ROOM_DIMENSIONS.WIDTH / 4]
  ), [order, nPlayers])

  const xRotation = useMemo(() => (
    isDead ? -Math.PI : -Math.PI / 2
  ), [isDead])

  function onSelectPlayer() {
    if (isDead) return;
    selectPlayer(id)
  }

  return (
    <AstronautModel
      animate={!isDead}
      onClick={onSelectPlayer}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={position}
      xRotation={xRotation}
      color={color}
    >
      {/* Player name and status */}
      {!hideTags &&
        <AstronautModel.Html position="top">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black] whitespace-nowrap">
              {username}
            </h3>
            <div className={`text-xs px-1 rounded ${isDead ? 'bg-red-500' : 'bg-green-500'} text-white whitespace-nowrap`}>
              {isDead ? 'DEAD' : 'ALIVE'}
            </div>
          </div>
        </AstronautModel.Html>
      }

      {/* Captain tag */}
      {!hideTags && isCaptain && (
        <AstronautModel.Html position="bottom">
          <div className="flex items-center justify-center">
            <h3 className="text-xs px-1 rounded-full bg-orange-500 text-white whitespace-nowrap">
              Captain
            </h3>
          </div>
        </AstronautModel.Html>
      )}

      {/* Hover effects */}
      <AstronautModel.Glow active={showGlow && !isDead} color={glowColor} />
    </AstronautModel>
  )
}

export const Player = memo(PlayerComponent)