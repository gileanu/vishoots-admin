import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";
import { format } from "date-fns";
import { HeadingH1 } from "@/components/headingh1";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/actions/get-categories";
import { getGalleries } from "@/actions/get-galleries";
import { getForms } from "@/actions/get-forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const contactPage = async ({ params }: { params: { portfolioId: string } }) => {
  const categories = await getCategories(params.portfolioId);
  const galleries = await getGalleries(params.portfolioId);
  const contact = await getForms(params.portfolioId);

  const formattedcontact: ContactColumn[] = contact.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    createdAt: format(item.createdAt, "dd LLL, yyyy"),
  }));
  return (
    <>
      <ContactClient data={formattedcontact} />
      <div className="flex-col">
        <div className="flex-1 space-y-4 mb-5">
          <HeadingH1
            title="Live website has"
            desc="Overview of your portfolio"
          />
          <Separator />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Categories:</CardTitle>
                <Image className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-2xl font-bold">{categories}</div>
                <Button variant="secondary" asChild>
                  <Link href={`/${params.portfolioId}/categories`}>
                    View categories
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Galleries:</CardTitle>
                <Images className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-2xl font-bold">{galleries}</div>
                <Button variant="secondary" asChild>
                  <Link href={`/${params.portfolioId}/galleries`}>
                    View galleries
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default contactPage;
