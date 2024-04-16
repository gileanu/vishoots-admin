"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlerProps {
  title: string;
  desc: string;
  variant: "public" | "secret";
}

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const textMap: Record<ApiAlerProps["variant"], string> = {
  public: "Public API url",
  secret: "Secret API url",
};

const variantMap: Record<ApiAlerProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  secret: "destructive",
};

export const ApiAlert: React.FC<ApiAlerProps> = ({
  title,
  desc,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(desc);
    toast.success("API route copied to clipboard");
  };
  return (
    <Alert className="shadow-lg">
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-1 flex items-center justify-between">
        <ScrollArea className="whitespace-nowrap rounded-md border bg-slate-50 dark:bg-slate-800 w-full h-[40px] pt-[10px]">
          <code className="relative rounded px-[0.6em] font-mono text-sm ">
            {desc}
          </code>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button className="m-2" variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
