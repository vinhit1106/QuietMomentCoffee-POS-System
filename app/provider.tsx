import BottomNavigation from "@/components/layout/BottomNavigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/layout/Header/Header";

const RootProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryProvider>
      <Header />
      <main className="container mx-auto my-6">{children}</main>
      <BottomNavigation />
    </QueryProvider>
  );
};

export default RootProvider;
