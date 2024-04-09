import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./theme-toggle";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div
      className="border-b max-w-5xl m-auto left-0 right-0
 fixed z-50 backdrop-blur-md bg-white/80 dark:bg-background/60 w-full"
    >
      <div className="flex h-8 mt-2 items-center px-3">
        <Badge
          className="rounded-md py-[0.3rem] dark:text-black"
          variant="green"
        >
          Live:
        </Badge>
        <div className="border-2 px-[0.2rem] m-[0.2rem] rounded-md">
          <a target="_blank" href={`${process.env.LIVE_WEB}`}>
            <code className="text-sm hover:underline">
              {process.env.LIVE_WEB_NAME}
            </code>
          </a>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="flex h-16 items-center px-3">
        <ScrollArea className="h-[45px] pt-2">
          <MainNav />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Navbar;
