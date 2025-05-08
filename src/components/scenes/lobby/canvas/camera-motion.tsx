import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export function CameraMotion() {
  const { camera } = useThree();
  const time = useRef(0);

  const cameraDistance = 0.001;

  useFrame((_, delta) => {
    time.current += delta * 0.5;

    const xAngle = MathUtils.degToRad(Math.sin(time.current * 0.5) * 5);
    const yAngle = MathUtils.degToRad(Math.sin(time.current * 0.3) * 2);

    camera.position.x = Math.sin(xAngle) * cameraDistance;
    camera.position.y = Math.sin(yAngle) * cameraDistance;
    camera.position.z = cameraDistance;

    camera.lookAt(0, 0, 0);
  });

  return null;
}
