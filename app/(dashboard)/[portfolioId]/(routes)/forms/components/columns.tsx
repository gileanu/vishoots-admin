"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import IsViewed from "./is-viewed";
import { ArrowUpDown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ContactColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
  IsViewed: boolean;
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "IsViewed",
    header: "Status",
    cell: ({ row }) => <IsViewed isViewed={row.original.IsViewed} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <span
          className="flex flex-row cursor-pointer hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 mt-0.5 h-4 w-4" />
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
