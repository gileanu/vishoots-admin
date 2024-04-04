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
      <div className="space-y-4">
        <HeadingH1
          title={`You have ${data.length} form submitions`}
          desc="View contact form submitions"
        />
        <Separator />
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
