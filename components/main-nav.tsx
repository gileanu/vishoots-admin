"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.portfolioId}`,
      label: "Home",
      active: pathname === `/${params.portfolioId}`,
    },
    {
      href: `/${params.portfolioId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.portfolioId}/billboards`,
    },
    {
      href: `/${params.portfolioId}/categories`,
      label: "Categories",
      active: pathname === `/${params.portfolioId}/categories`,
    },
    {
      href: `/${params.portfolioId}/galleries`,
      label: "Galleries",
      active: pathname === `/${params.portfolioId}/galleries`,
    },
    {
      href: `/${params.portfolioId}/settings`,
      label: "Settings",
      active: pathname === `/${params.portfolioId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-md font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
