import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div className="relative z-50">
              <Whatsapp />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
