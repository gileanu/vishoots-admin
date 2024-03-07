"use client";

import { useEffect, useState } from "react";

import { PortfolioModal } from "@/components/modals/portfolio-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PortfolioModal />
    </>
  );
};
