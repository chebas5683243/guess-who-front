import { create } from "zustand";

export type SelectChallengeModalProps = {
  modalType: "selectChallenge";
  data?: undefined;
};

export type NewChallengeModalProps = {
  modalType: "newChallenge";
  data?: {
    challenge: string;
  };
};

export type ModalProps = SelectChallengeModalProps | NewChallengeModalProps;
export type ModalType = ModalProps["modalType"] | null;
export type ModalData = ModalProps["data"] | null;

interface ModalStore {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  onOpen: (props: ModalProps) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (props) => {
    set({ type: props.modalType, data: props.data, isOpen: true });
  },
  onClose: () => {
    set({ type: null, isOpen: false, data: null });
  },
}));
