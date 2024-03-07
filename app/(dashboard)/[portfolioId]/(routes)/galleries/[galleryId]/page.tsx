import prismadb from "@/lib/prismadb";
import { GalleryForm } from "./components/gallery-form";

const GalleryPage = async ({
  params,
}: {
  params: { galleryId: string; portfolioId: string };
}) => {
  const gallery = await prismadb.gallery.findUnique({
    where: {
      id: params.galleryId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      portfolioId: params.portfolioId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <GalleryForm categories={categories} initialData={gallery} />
      </div>
    </div>
  );
};

export default GalleryPage;
