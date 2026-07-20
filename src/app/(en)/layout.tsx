import type { Metadata } from "next";
import { fontVariables } from "../../lib/fonts.ts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hiihtogreeni.fi"),
  title: {
    default: "Hiihtogreeni - Cabin for Rent in Levi",
    template: "%s | Hiihtogreeni",
  },
  description:
    "Hiihtogreeni is a cozy rental cabin in Levi, close to slopes and ski trails. Perfect for families and groups, max 14 guests.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Hiihtogreeni",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-270x270.png", sizes: "270x270", type: "image/png" },
    ],
    apple: "/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-180x180.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <body>
        {children}
      </body>
    </html>
  );
}
