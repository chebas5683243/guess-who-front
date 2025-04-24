"use client";

import { useEffect, useState } from "react";

import { SelectChallengeModal } from "../modals/select-challenge-modal";
import { NewChallengeModal } from "../modals/new-challenge-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SelectChallengeModal />
      <NewChallengeModal />
    </>
  );
}