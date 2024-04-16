import prismadb from "@/lib/prismadb";

export const getFormsNew = async (portfolioId: string) => {
  const getFormsNew = await prismadb.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      IsViewed: true,
    },
  });
  return getFormsNew;
};
