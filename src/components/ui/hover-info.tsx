import { Html } from '@react-three/drei'

interface HoverInfoProps {
  title: string
  description?: string
  position?: [number, number, number]
}

export function HoverInfo({ title, description, position = [0, 0, 0] }: HoverInfoProps) {
  return (
    <Html position={position} style={{ pointerEvents: 'none' }}>
      <div className="w-fit">
        <h3 className="text-lg font-bold mb-2 text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black]">{title}</h3>
        {description && <p className="text-sm text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black]">{description}</p>}
      </div>
    </Html>
  )
} 