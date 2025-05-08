import { useEffect } from "react";

type FirstRenderHandlerProp = {
  onLoad: () => void;
};

export function FirstRenderHandler({ onLoad }: FirstRenderHandlerProp) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return null;
}
