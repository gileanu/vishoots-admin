"use client";

import { useEffect } from "react";

import { usePortfolioModal } from "@/hooks/use-portfolio-modal";

const SetupPage = () => {
  const onOpen = usePortfolioModal((state) => state.onOpen);
  const isOpen = usePortfolioModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
