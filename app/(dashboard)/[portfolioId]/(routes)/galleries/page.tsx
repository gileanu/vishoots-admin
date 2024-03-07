import prismadb from "@/lib/prismadb";
import { GalleryClient } from "./components/client";
import { GalleryColumn } from "./components/columns";
import { format } from "date-fns";

const GalleryPage = async ({ params }: { params: { portfolioId: string } }) => {
  const galleries = await prismadb.gallery.findMany({
    where: {
      portfolioId: params.portfolioId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedGalleries: GalleryColumn[] = galleries.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "dd LLL, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <GalleryClient data={formattedGalleries} />
      </div>
    </div>
  );
};

export default GalleryPage;
