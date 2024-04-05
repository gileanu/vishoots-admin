import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";

import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarCheck,
  Text,
  UploadCloud,
  User,
} from "lucide-react";
import Link from "next/link";

const contactPage = async ({
  params,
}: {
  params: { formId: string; portfolioId: string };
}) => {
  const contact = await prismadb.contact.findUnique({
    where: {
      id: params.formId,
    },
  });

  // In viata mea n am scris ceva asa stupid
  // Zici ca s retarded

  function formatDate(date: string | undefined): string | undefined {
    if (date === "No date provided") {
      return date;
    } else {
      if (date && typeof date === "string") {
        return format(new Date(date), "dd LLL, yyyy");
      }
    }
  }

  function formatTime(time: string | undefined): string | undefined {
    if (time === "No time provided") {
      return time;
    } else {
      if (time && typeof time === "string") {
        return format(new Date(time), "hh:mm a");
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingH1
          title="Form details"
          desc="Make sure to respond via email or phone"
        />
        <Button asChild>
          <Link href={`/`}>
            <ArrowLeft className="mr-4 h-4 w-4" />
            Go back
          </Link>
        </Button>
      </div>
      <Separator className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Submitted on:</CardTitle>
              <UploadCloud className="h-6 w-6 text-sky-500" />
            </CardHeader>
            <CardContent>
              <p className="text-md p-3 border rounded-md">
                <span>
                  {format(contact?.createdAt.toString()!, "PPPPpppp")}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Client info:</CardTitle>
              <User className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Name:</p>
              <div className="md:text-md p-3 border rounded-md">
                {contact?.name}
              </div>
              <p className="text-sm text-muted-foreground">Email:</p>
              <div className="md:text-md p-3 border rounded-md underline">
                <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
              </div>
              <p className="text-sm text-muted-foreground">Phone number:</p>
              <div className="md:text-md p-3 border rounded-md underline">
                <a href={`tel:${contact?.phone}`}>{contact?.phone}</a>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Aditional info:</CardTitle>
              <CalendarCheck className="h-6 w-6 text-rose-500" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Date of the event:
              </p>
              <div className="md:text-md p-3 border rounded-md">
                {formatDate(contact?.date)}
              </div>
              <p className="text-sm text-muted-foreground">
                Time of the event:
              </p>
              <div className="md:text-md p-3 border rounded-md">
                {formatTime(contact?.time)}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Message</CardTitle>
              <Text className="h-6 w-6 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="md:text-md p-3 border rounded-md font-sans break-words">
                {contact?.message}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default contactPage;
