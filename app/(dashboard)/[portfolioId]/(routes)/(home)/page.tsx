import prismadb from "@/lib/prismadb";
import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";
import { format } from "date-fns";
import { HeadingH1 } from "@/components/ui/headingh1";
import { Separator } from "@/components/ui/separator";

const contactPage = async ({ params }: { params: { portfolioId: string } }) => {
  const portfolio = await prismadb.portfolio.findFirst({
    where: {
      id: params.portfolioId,
    },
  });

  const categories = await prismadb.category.findMany();

  const galleries = await prismadb.gallery.findMany();

  const contact = await prismadb.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedcontact: ContactColumn[] = contact.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    createdAt: format(item.createdAt, "dd LLL, yyyy"),
  }));
  return (
    <>
      <HeadingH1 title={portfolio?.name} desc="Portfolio at a glance" />
      <Separator className="my-5" />
      <div className="text-xl flex flex-col my-10">
        <p>Available Categories: {categories?.length}</p>
        <p>Available Galleries: {galleries?.length}</p>
      </div>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <ContactClient data={formattedcontact} />
        </div>
      </div>
    </>
  );
};

export default contactPage;
