"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormModalViewProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const FormModalView: React.FC<FormModalViewProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="p-2">
        <DialogHeader>
          <h1 className="text-xl font-bold">Submition</h1>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
