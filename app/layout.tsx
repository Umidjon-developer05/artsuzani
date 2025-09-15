import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Whatsapp from "@/components/shared/whatsapp";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://artsuzani.com"),
  description: "Artsuzani - Handmade Suzani Embroidery from Uzbekistan",
  applicationName: "Artsuzani",
  referrer: "origin-when-cross-origin",
  keywords: ["artsuzani", "suzani", "handmade", "embroidery", "uzbek"],
  authors: [{ name: "Artsuzani" }],
  creator: "Artsuzani",
  publisher: "Artsuzani",
  openGraph: {
    title: "Artsuzani - Handmade Suzani Embroidery from Uzbekistan",
    description:
      "Discover exquisite handmade Suzani embroidery from Uzbekistan at Artsuzani. Shop unique, traditional designs crafted with care.",
    type: "website",
    url: "https://artsuzani.com",
    locale: "uz_UZ",
    images:
      "https://9onczztehf.ufs.sh/f/lneKO3fyzBmDltA8PHEfyzBmDjUJPQdsrZTwG8aWF2VenuNg",
    countryName: "Uzbekistan",
    siteName: "Artsuzani",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <body>
          {children}
          <Toaster />
          <div className="relative z-50">
            <Whatsapp />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
