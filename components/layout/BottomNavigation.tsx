"use client";
import React from "react";
import {
  AlignJustify,
  Coffee,
  House,
  ListOrdered,
  ReceiptText,
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
        "hover:bg-muted/90 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3",
        pathname === source.href && "bg-muted/90",
      )}
    >
      <span className="">{source.icon}</span>
      <strong className="text-lg">{source.content}</strong>
    </Link>
  );
};

const BottomNavigation = () => {
  return (
    <div className="py-8">
      <nav className="border-border bg-background fixed right-0 bottom-0 left-0 z-10 h-16 border-t">
        <div className="container mx-auto my-1 grid grid-cols-5 place-items-center gap-x-8 font-medium">
          <NavLinkItem
            source={{
              content: "Home",
              icon: <House size={28} />,
              href: AppRoutes.HOME,
            }}
          />
          <NavLinkItem
            source={{
              content: "Orders",
              icon: <ListOrdered size={28} />,
              href: AppRoutes.ORDER.LIST,
            }}
          />

          {/* Order button center */}
          <Link
            href={AppRoutes.ORDER.NEW}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3"
          >
            <span className="absolute top-0 -translate-y-1/4 rounded-full bg-amber-400 p-6 transition-all hover:scale-105">
              <Coffee strokeWidth={2.5} size={32} />
            </span>
          </Link>
          <NavLinkItem
            source={{
              content: "Bills",
              icon: <ReceiptText size={28} />,
              href: AppRoutes.BILL,
            }}
          />
          <NavLinkItem
            source={{
              content: "Manage",
              icon: <AlignJustify size={28} />,
              href: AppRoutes.MANAGE,
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
