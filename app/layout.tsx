import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rasyarifky.my.id"),

  title: {
    default: "Rasya Rifky — Designer, Developer & Animator",
    template: "%s — Rasya Rifky",
  },

  description:
    "Portofolio Rasya Rifky, dikenal sebagai Fyrnnn, yang menampilkan karya desain visual, pengembangan website, programming, dan animasi.",

  keywords: [
    "Rasya Rifky",
    "Fyrnnn",
    "Rasya Rifky portfolio",
    "portfolio designer Indonesia",
    "web developer Indonesia",
    "motion designer",
    "graphic designer",
    "programmer Indonesia",
  ],

  authors: [
    {
      name: "Rasya Rifky",
      url: "https://rasyarifky.my.id",
    },
  ],

  creator: "Rasya Rifky",
  publisher: "Rasya Rifky",

  alternates: {
    canonical: "/",
  },

  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
},

  openGraph: {
    title: "Rasya Rifky — Designer, Developer & Animator",
    description:
      "Design, code, and motion portfolio by Rasya Rifky, also known as Fyrnnn.",
    url: "/",
    siteName: "Rasya Rifky Portfolio",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rasya Rifky — Designer, Developer & Animator",
    description:
      "Design, code, and motion portfolio by Rasya Rifky.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1110",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}