"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMonted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMonted) {
    return null;
  }

  return (
    <div>
      <ScrollArea className="mb-2">
        <div className="mb-4 flex items-center gap-4">
          {value.map((url) => (
            <div
              key={url}
              className="relative w-[250px] h-[250px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <img
                className="object-cover w-[250px] h-[250px]"
                alt="Image"
                src={url}
              />
            </div>
          ))}
        </div>
        <ScrollBar className="" orientation="horizontal" />
      </ScrollArea>
      <CldUploadWidget onUpload={onUpload} uploadPreset="kgqyytvy">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
