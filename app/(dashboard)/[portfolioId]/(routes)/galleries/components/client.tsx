"use client";

import { Button } from "@/components/ui/button";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { GalleryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface GalleryClientProps {
  data: GalleryColumn[];
}

export const GalleryClient: React.FC<GalleryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingH1
          title={`Galleries: (${data.length})`}
          desc="Add or update Galleries"
        />
        <Button
          onClick={() => router.push(`/${params.portfolioId}/galleries/new`)}
        >
          <Plus className="mr-4 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <HeadingH1 title="API's" desc="Available API calls for galleries" />
      <Separator />
      <ApiList entityName="galleries" entityIdName="galleryId" />
    </>
  );
};
