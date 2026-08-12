import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rasyarifky.my.id"),
  title: { default: "Rasya Rifky — Personal Portfolio", template: "%s — Rasya Rifky" },
  description: "Desain, kode, dan gerak — portofolio Rasya Rifky (Fyrnnn), tempat kreativitas bertemu logika.",
  alternates: { canonical: "/" },
  openGraph: { title: "Rasya Rifky — Fyrnnn", description: "Design, code, and motion — where creativity meets logic.", url: "/", siteName: "rasyarifky.my.id", type: "website" },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
