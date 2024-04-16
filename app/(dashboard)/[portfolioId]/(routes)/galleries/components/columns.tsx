"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import IsFeatured from "./is-featured";
import IsArchived from "./is-archived";

export type GalleryColumn = {
  id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<GalleryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => <IsFeatured isFeatured={row.original.isFeatured} />,
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => <IsArchived IsArchived={row.original.isArchived} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
