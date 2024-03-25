"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateSlug } from "@/lib/name-to-slug";
import BillImageUpload from "@/components/ui/bill-image-upload";

const formSchema = z.object({
  name: z.string().min(5, "Portfolio name must be at least 5 characters long"),
  imageUrl: z.string().min(1, "Billboard is required"),
  categoryDesc: z.string().min(1, "Category description is required"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Add new Category";
  const desc = initialData ? "Edit a Category" : "Create a new Category";
  const toastMsg = initialData ? "Category updated" : "Category added";
  const action = initialData ? "Save" : "Add new";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      categoryDesc: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const slug = generateSlug(data.name);
      const requestData = {
        ...data,
        categorySlug: slug,
      };
      if (initialData) {
        await axios.patch(
          `/api/${params.portfolioId}/categories/${params.categoryId}`,
          requestData
        );
      } else {
        await axios.post(`/api/${params.portfolioId}/categories`, requestData);
      }
      router.push(`/${params.portfolioId}/categories`);
      toast.success(toastMsg);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.portfolioId}/categories/${params.categoryId}`
      );
      router.push(`/${params.portfolioId}/categories`);
      router.refresh();
      toast.success("Category deleted");
    } catch (error) {
      toast.error("Make sure you removed all galleries first");
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
      <div className="flex items-center justify-between">
        <HeadingH1 title={title} desc={desc} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category billboard</FormLabel>
                <FormControl>
                  <BillImageUpload
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category short description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Category info</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              Categories serve as the primary galleries within which you will
              store all the sub-galleries
            </p>
            <p className="p-1">
              When creating a new category, select a billboard that closely
              resembles the images that will be hosted within the category.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
