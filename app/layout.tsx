import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Whatsapp from "@/components/shared/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artsuzani",
  description: "Artsuzani",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          {children}
          <div className="relative z-50">
            <Whatsapp />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
