import { create } from "zustand";

interface usePortfolioModalPortfolio {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePortfolioModal = create<usePortfolioModalPortfolio>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
