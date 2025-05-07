import { HomeCanvas } from "./canvas";
import { MainMenu } from "./main-menu";

export function HomeScene() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
      </div>

      <HomeCanvas />
      <MainMenu />
    </div>
  );
}
