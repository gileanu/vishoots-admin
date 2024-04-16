"use client";

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "../ui/button";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Form submition:"
      description="All the information provided by the client"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-3 space-x-2 flex items-center w-full">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="outline" onClick={onComplete}>
          Mark as complete
        </Button>
      </div>
    </Modal>
  );
};
