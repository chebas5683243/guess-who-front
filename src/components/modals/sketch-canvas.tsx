import { useRef } from "react"
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas"

export function SketchCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  return (
    <ReactSketchCanvas
      ref={canvasRef}
      width="100%"
      height="100%"
      strokeWidth={4}
      strokeColor="#00ffff"
      canvasColor="transparent"
      style={{
        border: "none",
        background: "transparent",
      }}
    />
  )
} 