"use client";

import { Button } from "@/components/ui/button";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingH1
          title={`Categories: (${data.length})`}
          desc="Add or update Categories"
        />
        <Button
          onClick={() => router.push(`/${params.portfolioId}/categories/new`)}
        >
          <Plus className="mr-4 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Category table info</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              Every image gallery is categorized, with each category featuring a
              billboard.
            </p>
            <p className="p-1">
              Here, you have the ability to update, switch, or delete
              categories.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <HeadingH1 title="API's" desc="Available API calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>API calls</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              This includes API calls for GET, POST, PATCH, and DELETE methods.
              Here&apos;s what each one does:
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
