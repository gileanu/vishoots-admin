import prismadb from "@/lib/prismadb";

export const getGalleries = async (portfolioId: string) => {
  const getGalleries = await prismadb.gallery.count({
    where: {
      portfolioId,
      isArchived: false,
    },
  });

  return getGalleries;
};
