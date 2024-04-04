import prismadb from "@/lib/prismadb";

export const getForms = async (portfolioId: string) => {
  const getForms = await prismadb.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return getForms;
};
