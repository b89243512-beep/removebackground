import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Tools Online - Background Remover, Compressor, Converter, Resizer",
  description:
    "Free online image tools: remove backgrounds, compress images, convert JPG to PNG, PNG to JPG, and resize photos. All tools are 100% free, no sign-up needed.",
  keywords: ["free image tools", "online image editor", "photo tools free", "image converter", "background remover", "image compressor", "image resizer"],
  openGraph: {
    title: "Free Image Tools Online - All-in-One Photo Editing Suite",
    description: "Background remover, image compressor, format converter, resizer — all free, all in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Tools Online - All-in-One Photo Editing Suite",
    description: "Background remover, image compressor, format converter, resizer — all free, all in your browser.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
