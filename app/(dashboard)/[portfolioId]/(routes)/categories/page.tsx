import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({
  params,
}: {
  params: { portfolioId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      portfolioId: params.portfolioId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    categoryDesc: item.categoryDesc,
    createdAt: format(item.createdAt, "dd LLL, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
