import { Suspense } from "react";
import { useModal } from "@/stores/use-modal-store";
import { Player } from "./player";
import { usePlayers } from "@/stores/use-players-store";
import { useChallenge } from "@/stores/use-challenge-store";

export function PlayersGroup() {
  const players = usePlayers((state) => state.players);
  const participantsId = useChallenge((state) => state.participantsId);
  const anyModalOpen = useModal((state) => state.isOpen);

  return (
    <>
      {players.map((player) => {
        const isSelected = participantsId.some((sp) => sp === player.id);

        return (
          <Suspense key={player.id} fallback={null}>
            <Player
              id={player.id}
              order={player.order}
              isAlive={player.isAlive}
              username={player.username}
              nPlayers={players.length}
              isCaptain={player.isCaptain}
              hideTags={anyModalOpen}
              isSelected={isSelected}
              color={player.color}
            />
          </Suspense>
        );
      })}
    </>
  );
}
