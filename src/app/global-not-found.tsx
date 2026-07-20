import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Sivua ei löytynyt",
  description: "Etsimääsi sivua ei löytynyt.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="fi" className={inter.className}>
      <body>
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-display text-6xl font-bold text-fjord">404</p>
          <h1 className="text-3xl md:text-4xl">Sivua ei löytynyt</h1>
          <p className="text-lg text-slate">
            Etsimääsi sivua ei ole olemassa tai se on siirretty.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-control bg-fjord px-5 py-2.5 font-semibold text-white transition-colors hover:bg-fjord-dark"
            >
              Etusivu (FI)
            </Link>
            <Link
              href="/en/home/"
              rel="alternate"
              hrefLang="en-GB"
              className="rounded-control border border-fjord px-5 py-2.5 font-semibold text-fjord transition-colors hover:bg-mist"
            >
              Home (EN)
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
