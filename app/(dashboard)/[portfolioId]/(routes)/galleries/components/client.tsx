"use client";

import { Button } from "@/components/ui/button";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { GalleryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Billboard table info</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              You can add or change the Billboard from this page.
            </p>
            <p className="p-1">
              Billboards serve as the primary image for every gallery you
              create. Ensure you select an image that accurately represents the
              content of the sub-galleries.
            </p>
            <p className="p-1">
              Before deleting your billboard, ensure all associated galleries
              are removed.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <HeadingH1 title="API's" desc="Available API calls for galleries" />
      <Separator />
      <ApiList entityName="galleries" entityIdName="galleryId" />
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>API calls</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              This includes API calls for GET, POST, PATCH, and DELETE methods.
              Here's what each one does:
              <ol className="p-2">
                <li>
                  GET: Retrieves data from the server. It is used to read or
                  fetch resources.
                </li>
                <li>
                  POST: Sends data to the server to create a new resource. It is
                  used to submit data to be processed to a specified resource.
                </li>
                <li>
                  PATCH: Sends data to the server to update an existing
                  resource. It is used to apply partial modifications to a
                  resource.
                </li>
                <li>
                  DELETE: Sends a request to remove a resource from the server.
                  It is used to delete the specified resource.
                </li>
              </ol>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
