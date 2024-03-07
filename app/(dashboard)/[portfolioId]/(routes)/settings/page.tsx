import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingPageProps {
  params: {
    portfolioId: string;
  };
}

const SettingsPage: React.FC<SettingPageProps> = async ({ params }) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <SettingsForm initialData={portfolio} />
      </div>
    </div>
  );
};

export default SettingsPage;
