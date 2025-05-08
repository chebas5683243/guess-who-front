import { useState } from "react";

type CanvasLoadArgs =
  | {
      onLoad?: () => void;
      fadeIn?: boolean;
      fadeInDuration?: number;
    }
  | undefined;

export function useCanvasLoad(args?: CanvasLoadArgs) {
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  function onCanvasLoad() {
    setIsCanvasReady(true);
    if (args?.fadeIn) {
      setTimeout(() => setHideOverlay(true), args.fadeInDuration);
    }
    args?.onLoad?.();
  }

  return {
    isCanvasReady,
    hideOverlay,
    onCanvasLoad,
  };
}
