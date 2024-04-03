"use client";

import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";
import { ContactColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ContactClientProps {
  data: ContactColumn[];
}

export const ContactClient: React.FC<ContactClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingH1
          title={`Leads: (${data.length})`}
          desc="View contact form submitions"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
