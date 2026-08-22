import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Navigation } from "@/components/chrome/Navigation";
import { PiedDePage } from "@/components/chrome/PiedDePage";
import { SITE } from "@/lib/infos";
import { schemaRestaurant } from "@/lib/schema";
import "./globals.css";

// latin-ext est indispensable : Hüseyin, Sertaç, dürüm, kısır, patlıcan.
const display = Bricolage_Grotesque({
  variable: "--police-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const texte = Instrument_Sans({
  variable: "--police-texte",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.titre,
    template: "%s — Snack du Marché",
  },
  description: SITE.description,
  applicationName: "Snack du Marché",
  authors: [{ name: "Snack du Marché" }],
  keywords: [
    "kebab Lausanne",
    "meilleur kebab Lausanne",
    "traiteur turc Lausanne",
    "döner Lausanne",
    "Riponne",
    "Gaziantep",
    "mezze Lausanne",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: SITE.url,
    siteName: "Snack du Marché",
    title: SITE.titre,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.titre, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#152b18",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={`${display.variable} ${texte.variable}`}>
      <body>
        {/* Sans JavaScript, les blocs à révélation restent visibles. */}
        <noscript>
          <style>{".revele{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
        <a
          href="#contenu"
          className="btn sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-fond"
        >
          Aller au contenu
        </a>
        <Navigation />
        <main id="contenu">{children}</main>
        <PiedDePage />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaRestaurant() }}
        />
      </body>
    </html>
  );
}
