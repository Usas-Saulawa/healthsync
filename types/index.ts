import { Dispatch, ReactNode, SetStateAction } from "react";

export interface EHRContextProps {
  modalOpen: boolean;
  loading: boolean;
  showTooltip: (target: HTMLElement, content: React.ReactNode) => void;
  hideTooltip: () => void;
  setModal: Dispatch<
    SetStateAction<{ modalOpen: boolean; modalName: string; modalContent: any }>
  >;
}

export interface ContextProps {
  children: ReactNode;
}
