import prismadb from "@/lib/prismadb";

export const getCategories = async (portfolioId: string) => {
  const getCategories = await prismadb.category.count({
    where: {
      portfolioId,
    },
  });

  return getCategories;
};
