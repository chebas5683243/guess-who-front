import { Sphere } from "@react-three/drei";

export function CenterDot() {
  return (
    <Sphere args={[0.01, 32, 32]}>
      <meshStandardMaterial color="red" />
    </Sphere>
  )
}