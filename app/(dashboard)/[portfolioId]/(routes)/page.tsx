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
  return <div>Active Portfolio: {portfolio?.name}</div>;
};

export default DashboardPage;
