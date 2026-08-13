export type Lang = "id" | "en";
export type Work = {
  id: string;
  title: string;
  subtitle: { id: string; en: string };
  description: { id: string; en: string };
  // Opsional. Gambar karya akan memakai rasio file aslinya secara otomatis.
  ratio?: "portrait" | "landscape" | "square";
  tone: number;
  image?: string;
  imageAlt?: string;
  video?: string;
  url?: string;
};

export const siteConfig = {
  supportUrl: "https://saweria.co",
};

export const social = [
  {
    label: "YouTube",
    mark: "YT",
    url: "https://www.youtube.com/channel/UCXfgabklGhnBH7a4a8HTdbA",
  },
  {
    label: "Instagram",
    mark: "IG",
    url: "https://www.instagram.com/rasyarifky_/",
  },
  { label: "TikTok", mark: "TK", url: "tiktok.com/@rasyarifkyy" },
  { label: "X", mark: "X", url: "https://x.com" },
  { label: "GitHub", mark: "GH", url: "https://github.com/rasyarifky" },
];

// Media dapat berupa path lokal atau link berbagi Google Drive.
// Contoh gambar: image: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
// Contoh video: video: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
// Pastikan akses Drive diatur ke "Siapa saja yang memiliki link".

export const designs: Work[] = [
  {
    id: "d1",
    title: "Brosur SPMB SMK YAPIS",
    subtitle: { id: "Brosur", en: "Brosur" },
    tone: 1,
    image: "https://drive.google.com/file/d/170UFDHXjCqKUIRj2WWFMFF_-KGlF6qly/view?usp=drive_link",
    description: {
      id: "Brosur informasi tentang penerimaan murid baru di sekolah SMK YAPIS",
      en: "Information brochure about accepting new students at YAPIS Vocational School",
    },
  },
  {
    id: "d2",
    title: "Ruang Tumbuh",
    subtitle: { id: "Poster editorial", en: "Editorial poster" },
    tone: 2,
    description: {
      id: "Komposisi editorial yang membahas ruang aman untuk bertumbuh, gagal, dan mencoba kembali.",
      en: "An editorial composition about a safe space to grow, fail, and try again.",
    },
  },
  {
    id: "d3",
    title: "Nocturne 03",
    subtitle: { id: "Identitas visual", en: "Visual identity" },
    tone: 3,
    description: {
      id: "Studi warna, ritme, dan tipografi yang terinspirasi suasana kota setelah tengah malam.",
      en: "A study of color, rhythm, and typography inspired by the city after midnight.",
    },
  },
  {
    id: "d4",
    title: "Gelora",
    subtitle: { id: "Visual kampanye", en: "Campaign visual" },
    tone: 4,
    description: {
      id: "Identitas visual yang menangkap energi kolektif dan keberanian untuk mengambil ruang.",
      en: "A visual identity that captures collective energy and the courage to take space.",
    },
  },
  {
    id: "d5",
    title: "Koneksi",
    subtitle: { id: "Kolase digital", en: "Digital collage" },
    tone: 5,
    description: {
      id: "Kolase digital tentang hubungan manusia, teknologi, dan jarak yang terus berubah.",
      en: "A digital collage about people, technology, and the ever-changing meaning of distance.",
    },
  },
  {
    id: "d6",
    title: "Sela",
    subtitle: { id: "Eksplorasi tipografi", en: "Type exploration" },
    tone: 6,
    description: {
      id: "Eksplorasi tipografi yang melihat jeda sebagai bagian penting dari sebuah cerita.",
      en: "A typography exploration that treats pauses as an essential part of a story.",
    },
  },
];

export const programs: Work[] = [
  {
    id: "p1",
    title: "PhishLab",
    subtitle: {
      id: "Platform edukasi keamanan siber",
      en: "Security learning platform",
    },
    ratio: "landscape",
    tone: 2,
    url: "https://drive.google.com/file/d/170UFDHXjCqKUIRj2WWFMFF_-KGlF6qly/view?usp=drive_link",
    description: {
      id: "Kenali phishing sebelum ia mengelabui Anda.",
      en: "Learn to spot phishing before it fools you.",
    },
  },
  {
    id: "p2",
    title: "Trucking Rate",
    subtitle: { id: "Kalkulator tarif logistik", en: "Logistics calculator" },
    ratio: "landscape",
    tone: 5,
    url: "https://example.org/?project=trucking-rate",
    description: {
      id: "Hitung tarif logistik dalam hitungan detik.",
      en: "Freight pricing, calculated in seconds.",
    },
  },
  {
    id: "p3",
    title: "Presence",
    subtitle: { id: "Sistem absensi", en: "Attendance system" },
    ratio: "landscape",
    tone: 3,
    url: "https://example.net/?project=presence",
    description: {
      id: "Absensi tanpa ribet, terekam otomatis.",
      en: "Attendance, tracked without the hassle.",
    },
  },
];

export const animations: Work[] = [
  {
    id: "a1",
    title: "Orbit",
    subtitle: { id: "Studi gerak — 00:28", en: "Motion study — 00:28" },
    ratio: "landscape",
    tone: 4,
    video: "/media/mvi-2116.mp4",
    description: {
      id: "Studi motion tentang orbit, keseimbangan, dan pergerakan yang terus berulang.",
      en: "A motion study about orbit, balance, and continuous movement.",
    },
  },
  {
    id: "a2",
    title: "Type in Motion",
    subtitle: {
      id: "Tipografi kinetik — 00:36",
      en: "Kinetic typography — 00:36",
    },
    ratio: "landscape",
    tone: 1,
    video: "/media/mvi-2116.mp4",
    description: {
      id: "Eksplorasi tipografi kinetik dengan transisi yang mengikuti ritme suara.",
      en: "A kinetic typography exploration with transitions driven by sound rhythm.",
    },
  },
  {
    id: "a3",
    title: "Fragments",
    subtitle: { id: "Kolase animasi — 00:42", en: "Animated collage — 00:42" },
    ratio: "landscape",
    tone: 6,
    video: "/media/mvi-2116.mp4",
    description: {
      id: "Kolase bergerak yang menyusun potongan memori menjadi satu narasi pendek.",
      en: "A moving collage that assembles fragments of memory into a short narrative.",
    },
  },
];
