import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export function CameraMotion() {
  const { camera } = useThree();
  const angle = useRef(0);

  useFrame(() => {
    angle.current += 0.0005;

    const r = 2.5;
    const phi = angle.current;
    const theta = (Math.sin(angle.current * 0.5) * Math.PI) / 3;

    camera.position.x = r * Math.sin(theta) * Math.cos(phi);
    camera.position.y = r * Math.cos(theta);
    camera.position.z = r * Math.sin(theta) * Math.sin(phi);

    camera.lookAt(0, 0, 0);
  });

  return null;
}
