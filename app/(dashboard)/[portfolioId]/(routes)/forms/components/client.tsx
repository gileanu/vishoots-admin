"use client";

import { ContactColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ContactClientProps {
  data: ContactColumn[];
}

export const ContactClient: React.FC<ContactClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
