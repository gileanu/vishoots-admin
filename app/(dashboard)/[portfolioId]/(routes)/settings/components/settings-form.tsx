"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApiAlert } from "@/components/ui/api-alert";
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
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Portfolio } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface SettingFormProps {
  initialData: Portfolio;
}

const formSchema = z.object({
  name: z.string().min(1, "Portfolio name must be at least one character long"),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/portfolios/${params.portfolioId}`, data);
      toast.success("Portfolio updated");
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
      await axios.delete(`/api/portfolios/${params.portfolioId}`);
      router.refresh();
      router.push("/");
      toast.success("Portfolio deleted");
    } catch (error) {
      toast.error("Make sure you removed all Galleries and Images first");
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
        <HeadingH1 title="Settings" desc="Manage Portfolio and API" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Portfolio name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            Save
          </Button>
        </form>
      </Form>
      <Separator />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Portfolio name info</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              Manage your portfolio with options to rename, delete, and access
              the API key directly from this page.
            </p>
            <p className="p-1">
              Before deleting your portfolio, ensure all associated billboards
              are removed.
            </p>
            <div className="inline-flex items-center rounded-xl border px-2 py-1 text-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground">
              Deleting the Portfolio will break the live website
            </div>
            <p className="p-1">
              Currently the portfolio name holds no functional significance on
              the backend or the frontend (Live website). It is just used as a
              label here and on the database.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        desc={`${origin}/api/${params.portfolioId}`}
        variant="public"
      />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>API info</AccordionTrigger>
          <AccordionContent>
            <p className="p-1">
              Utilize this API URL to link to the live website. Ensure the
              website is accessible and that the domain is accurate.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
