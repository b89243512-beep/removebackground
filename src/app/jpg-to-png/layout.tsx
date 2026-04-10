import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JPG to PNG Converter Online - Convert JPEG to PNG Instantly",
  description:
    "Convert JPG to PNG online for free. Transform JPEG images to high-quality PNG format with transparency support. Processed in your browser — no server uploads.",
  keywords: [
    "jpg to png",
    "jpeg to png",
    "convert jpg to png free",
    "jpg to png converter online",
    "change jpg to png",
    "jpeg to png free online",
    "image format converter",
    "jpg to transparent png",
  ],
  openGraph: {
    title: "Free JPG to PNG Converter - Instant Online Conversion",
    description: "Convert JPG/JPEG images to PNG format. Lossless quality, transparency support. Free, instant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JPG to PNG Converter - Instant Online Conversion",
    description: "Convert JPG/JPEG images to PNG format. Lossless quality, transparency support. Free, instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
