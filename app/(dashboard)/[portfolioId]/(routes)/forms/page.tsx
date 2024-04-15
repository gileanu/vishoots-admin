import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";
import { format } from "date-fns";
import { getForms } from "@/actions/get-forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeadingH1 } from "@/components/headingh1";
import { Separator } from "@/components/ui/separator";

const contactPage = async ({ params }: { params: { portfolioId: string } }) => {
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
      <div className="space-y-4">
        <HeadingH1
          title="Form submissions"
          desc="View and respond to clients"
        />
        <Separator />
      </div>
      <ContactClient data={formattedcontact} />
    </>
  );
};

export default contactPage;
