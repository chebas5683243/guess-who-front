import { PlanetModel } from "@/components/meshes/planet";
import { useGame } from "@/stores/use-game-store";
import { useState } from "react";

const DELTA_FROM_CENTER = {
  x: { start: 90, end: -50 },
  y: { start: 60, end: 0 },
  z: { start: 2000, end: 160 },
};

function calculatePlanetScale(currentDay: number, totalDays: number) {
  const distancePerDay =
    (DELTA_FROM_CENTER.z.start - DELTA_FROM_CENTER.z.end) / (totalDays - 1);
  return (
    DELTA_FROM_CENTER.z.start /
    (DELTA_FROM_CENTER.z.start - distancePerDay * (currentDay - 1))
  );
}

function calculatePlanetXYPosition(currentDay: number, totalDays: number) {
  const slopeX =
    (DELTA_FROM_CENTER.x.end - DELTA_FROM_CENTER.x.start) / (totalDays - 1);
  const slopeY =
    (DELTA_FROM_CENTER.y.end - DELTA_FROM_CENTER.y.start) / (totalDays - 1);

  const interceptX =
    DELTA_FROM_CENTER.x.start -
    (DELTA_FROM_CENTER.x.end - DELTA_FROM_CENTER.x.start) / (totalDays - 1);
  const interceptY =
    DELTA_FROM_CENTER.y.start -
    (DELTA_FROM_CENTER.y.end - DELTA_FROM_CENTER.y.start) / (totalDays - 1);

  return {
    x: slopeX * currentDay + interceptX,
    y: slopeY * currentDay + interceptY,
  };
}

export function Zerus() {
  const currentDay = useGame((state) => state.currentDay);
  const totalDays = useGame((state) => state.totalDays);

  const [isHovered, setIsHovered] = useState(false);

  const scale = calculatePlanetScale(currentDay, totalDays);
  const { x: xPos, y: yPos } = calculatePlanetXYPosition(currentDay, totalDays);
  const zPos = -DELTA_FROM_CENTER.z.end;

  return (
    <PlanetModel
      position={[xPos, yPos, zPos]}
      color={isHovered ? PlanetModel.COLOR_RED : PlanetModel.COLOR_DARK_RED}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={scale}
    >
      {isHovered && (
        <PlanetModel.Html>
          <div className="w-fit">
            <h3 className="text-sm font-bold mb-2 text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black]">
              Zerus
            </h3>
          </div>
        </PlanetModel.Html>
      )}
    </PlanetModel>
  );
}
