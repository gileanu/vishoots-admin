"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import BillImageUpload from "@/components/ui/bill-image-upload";
import ImageUpload from "@/components/ui/image-upload";
import { Category, Gallery, Image } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { generateSlug } from "@/lib/name-to-slug";

const formSchema = z.object({
  title: z
    .string()
    .max(20, "Max 20 characters")
    .min(1, "Gallery title is required"),
  images: z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .nonempty(),
  location: z.string().max(20, "Max 28 characters").optional(),
  specs: z.string().max(20, "Max 28 characters").optional(),
  featImage: z.string().min(1, "Gallery featured image is required"),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type GalleryFormValues = z.infer<typeof formSchema>;

interface GalleryFormProps {
  initialData:
    | (Gallery & {
        images: Image[];
      })
    | null;
  categories: Category[];
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Gallery" : "Add new Gallery";
  const desc = initialData ? "Edit a Gallery" : "Create a new Gallery";
  const toastMsg = initialData ? "Gallery updated" : "Gallery added";
  const action = initialData ? "Save" : "Add new";

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          title: "",
          location: "",
          specs: "",
          featImage: "",
          images: [],
          categoryId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: GalleryFormValues) => {
    try {
      setLoading(true);
      const slug = generateSlug(data.title);
      const requestData = {
        ...data,
        gallerySlug: slug,
      };
      if (initialData) {
        await axios.patch(
          `/api/${params.portfolioId}/galleries/${params.galleryId}`,
          requestData
        );
      } else {
        await axios.post(`/api/${params.portfolioId}/galleries`, requestData);
      }
      router.push(`/${params.portfolioId}/galleries`);
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
        `/api/${params.portfolioId}/galleries/${params.galleryId}`
      );
      router.push(`/${params.portfolioId}/galleries`);
      router.refresh();
      toast.success("Gallery deleted");
    } catch (error) {
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
          className="space-y-4 w-full pb-24"
        >
          <FormField
            control={form.control}
            name="featImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gallery Featured Image &#42;</FormLabel>
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gallery images &#42;</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery title &#42;</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Gallery title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category &#42;</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specs</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nikon w/ zoom lens"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Miami FL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This gallery will be featured on the homepage when
                      checked.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archive</FormLabel>
                    <FormDescription>
                      Temporarily hide gallery from the website when checked.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <Button disabled={loading} type="submit">
              {action}
            </Button>
            <p className="ml-auto text-muted-foreground text-sm">
              &#42; fields are required
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};
