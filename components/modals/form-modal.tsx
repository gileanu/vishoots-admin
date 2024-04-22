"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FormModalView } from "../form-modal";
import { ContactColumn } from "@/app/(dashboard)/[portfolioId]/(routes)/forms/components/columns";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface FormModalProps {
  data: ContactColumn;
  isOpen: boolean;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  function formatDate(date: string | undefined): string | undefined {
    if (date === "No date provided") {
      return date;
    } else {
      if (date && typeof date === "string") {
        return format(new Date(date), "dd LLL, yyyy");
      }
    }
  }

  function formatTime(time: string | undefined): string | undefined {
    if (time === "No time provided") {
      return time;
    } else {
      if (time && typeof time === "string") {
        return format(new Date(time), "hh:mm a");
      }
    }
  }

  return (
    <FormModalView isOpen={isOpen} onClose={onClose}>
      <h2 className="pb-2">Submitted on: {data.createdAt}</h2>
      <ScrollArea className="h-[450px] w-full rounded-md border p-3">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">Name</p>
          <div className="md:text-md rounded-md border p-2">{data.name}</div>
          <p className="text-muted-foreground text-sm">Email</p>
          <div className="md:text-md rounded-md border p-2">
            <a href={`mailto:${data.email}`} className="underline">
              {data.email}
            </a>
          </div>
          <p className="text-muted-foreground text-sm">Phone</p>
          <div className="md:text-md rounded-md border p-2">
            <a href={`tel:${data.phone}`} className="underline">
              {data.phone}
            </a>
          </div>
          <p className="text-muted-foreground text-sm">Date and time</p>
          <div className="flex flex-row gap-1 justify-start items-center">
            <div className="md:text-md rounded-md border p-2">
              {formatDate(data.date)}
            </div>
            <p>at</p>
            <div className="md:text-md rounded-md border p-2">
              {formatTime(data.time)}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Name</p>
          <div className="md:text-md rounded-md border p-2 break-words">
            {data.message}
          </div>
        </div>
        <ScrollBar />
      </ScrollArea>
      <div className="pt-3 space-x-2 flex items-center w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Close
        </Button>
        <Button variant="default" disabled={!data.IsViewed} onClick={onConfirm}>
          Mark as viewed
        </Button>
      </div>
    </FormModalView>
  );
};
