import type { Metadata } from "next";
import { fontVariables } from "../../lib/fonts.ts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hiihtogreeni.fi"),
  title: {
    default: "Hiihtogreeni - Vuokramökki Levillä",
    template: "%s | Hiihtogreeni",
  },
  description:
    "Hiihtogreeni on viihtyisä vuokramökki Levillä, lähellä rinteitä ja latuja. Mökki sopii perheille ja ryhmille, max 14 henkilöä.",
  openGraph: {
    type: "website",
    locale: "fi_FI",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={fontVariables}>
      <body>
        {children}
      </body>
    </html>
  );
}
