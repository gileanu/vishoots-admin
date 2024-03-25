import { HeadingH1 } from "@/components/ui/headingh1";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { portfolioId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const portfolio = await prismadb.portfolio.findFirst({
    where: {
      id: params.portfolioId,
    },
  });
  return (
    <>
      <HeadingH1 title={portfolio?.name} desc="Portfolio at a glance" />
    </>
  );
};

export default DashboardPage;
