import Navbar from "@/components/navbar";
import Container from "@/components/ui/page-container";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { portfolioId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const portfolio = await prismadb.portfolio.findFirst({
    where: {
      id: params.portfolioId,
      userId,
    },
  });
  if (!portfolio) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
