"use client";
import React from "react";
import {
  Coffee,
  House,
  NotebookPen,
  Package,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import AppRoutes from "@/constant/AppRoutes.constant";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLinkItem = ({
  source,
}: {
  source: { icon: React.JSX.Element; content: string; href: string };
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={source.href}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 transition-all",
        pathname === source.href
          ? "bg-indigo-100 text-indigo-500"
          : "hover:bg-muted/90",
      )}
    >
      <span className="">{source.icon}</span>
      <span className="text-lg font-semibold">{source.content}</span>
    </Link>
  );
};

const BottomNavigation = () => {
  return (
    <div className="py-8">
      <nav className="border-border bg-background fixed right-0 bottom-0 left-0 z-10 h-16 border-t">
        <div className="container mx-auto my-1 grid grid-cols-7 place-items-center gap-x-4">
          <NavLinkItem
            source={{
              content: "Home",
              icon: <House size={24} />,
              href: AppRoutes.HOME,
            }}
          />
          <NavLinkItem
            source={{
              content: "Orders",
              icon: <ScrollText size={24} />,
              href: AppRoutes.ORDER.LIST,
            }}
          />

          <NavLinkItem
            source={{
              content: "Inventory",
              icon: <Package size={24} />,
              href: AppRoutes.INVENTORY,
            }}
          />
          {/* Order button center */}
          <Link
            href={AppRoutes.ORDER.NEW}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3"
          >
            <div className="absolute top-0 -translate-y-1/4 rounded-full bg-amber-400 p-6 transition-all hover:scale-105">
              <Coffee size={28} />
            </div>
          </Link>
          <NavLinkItem
            source={{
              content: "Edit Menu",
              icon: <NotebookPen size={24} />,
              href: AppRoutes.EDIT_MENU,
            }}
          />
          <NavLinkItem
            source={{
              content: "Customers",
              icon: <Users size={24} />,
              href: AppRoutes.CUSTOMER,
            }}
          />
          <NavLinkItem
            source={{
              content: "Settings",
              icon: <Settings size={24} />,
              href: AppRoutes.SETTINGS,
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
