import { HeadingH1 } from "@/components/headingh1";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/actions/get-categories";
import { getGalleries } from "@/actions/get-galleries";
import { getForms } from "@/actions/get-forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput, Image, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFormsNew } from "@/actions/get-forms-new";

const contactPage = async ({ params }: { params: { portfolioId: string } }) => {
  const categories = await getCategories(params.portfolioId);
  const galleries = await getGalleries(params.portfolioId);
  const contact = await getForms(params.portfolioId);
  const contactNew = await getFormsNew(params.portfolioId);
  return (
    <>
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
                <CardTitle>Contact form:</CardTitle>
                <FormInput className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-2xl">
                  <span className="text-green-500 font-bold">
                    {contactNew.length}
                  </span>{" "}
                  new, <span className="font-bold">{contact.length}</span> total
                </div>
                <Button variant="secondary" asChild>
                  <Link href={`/${params.portfolioId}/forms`}>
                    View submissions
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
