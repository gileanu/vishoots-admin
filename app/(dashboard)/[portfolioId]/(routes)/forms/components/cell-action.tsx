"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContactColumn } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Trash,
  View,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { FormModal } from "@/components/modals/form-modal";

interface CellActionProps {
  data: ContactColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.portfolioId}/form/${data.id}`);
      router.refresh();
      toast.success("Form submission deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-row justify-center">
        <Button
          variant="link"
          onClick={() =>
            router.push(`/${params.portfolioId}/forms/form/${data.id}`)
          }
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className=""
          variant="destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
