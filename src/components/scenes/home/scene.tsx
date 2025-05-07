import { HomeCanvas } from "./canvas";
import { MainMenu } from "./main-menu";

export function HomeScene() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <HomeCanvas />
      <MainMenu />
    </div>
  );
}
