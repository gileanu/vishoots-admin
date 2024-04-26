"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FormModalView } from "../form-modal";
import { ContactColumn } from "@/app/(dashboard)/[portfolioId]/(routes)/forms/components/columns";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

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
      <div className="flex flex-col gap-2 w-full text-muted-foreground">
        <div>
          <p className="text-sm">Name:</p>
          <div className="border p-2 rounded-md">
            <p className="text-foreground">{data.name}</p>
          </div>
        </div>
        <div>
          <p className="text-sm">Email:</p>
          <div className="border p-2 rounded-md">
            <a
              href={`mailto:${data.email}`}
              className="text-foreground underline"
            >
              {data.email}
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm">Phone number:</p>
          <div className="border p-2 rounded-md">
            <a href={`tel:${data.phone}`} className="text-foreground underline">
              {data.phone}
            </a>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-1/2">
            <p className="text-sm">Date of the event:</p>
            <div className="border p-2 rounded-md">
              <p>{formatDate(data.date)}</p>
            </div>
          </div>
          <div className="w-1/2">
            <p className="text-sm">Time of the event:</p>
            <div className="border p-2 rounded-md">
              <p>{formatTime(data.time)}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <p className="text-sm">Message:</p>
          <div className="rounded-md">
            <ScrollArea className="h-40 rounded-md border p-2">
              <p className="relative break-words max-w-[470px]">
                {data.message}
              </p>
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="pt-2 space-x-2 flex flex-row justify-start">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Close
        </Button>
        <Button variant="default" disabled={!data.IsViewed} onClick={onConfirm}>
          Mark as viewed
        </Button>
        <h2 className="text-muted-foreground text-sm">
          <p>Dated:</p>
          {data.createdAt}
        </h2>
      </div>
    </FormModalView>
  );
};
