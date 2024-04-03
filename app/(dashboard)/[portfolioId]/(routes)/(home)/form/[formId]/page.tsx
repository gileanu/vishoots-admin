import prismadb from "@/lib/prismadb";

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
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">{contact?.name}</div>
    </div>
  );
};

export default contactPage;
