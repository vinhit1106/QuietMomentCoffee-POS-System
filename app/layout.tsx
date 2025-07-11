import type { Metadata } from "next";
import { Inter, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import RootProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";
const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const montserratAlternatesFont = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Quiet Moment Coffee",
  description: "Quiet Moment Coffee - Coffee, Focus, Flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.className} ${montserratAlternatesFont.variable} antialiased`}
      >
        <RootProvider>{children}</RootProvider>
        <Toaster
          position="bottom-right"
          richColors
          duration={3000}
          toastOptions={{
            className: "text-sm",
            style: {
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
