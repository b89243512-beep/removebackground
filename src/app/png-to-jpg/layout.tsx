import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free PNG to JPG Converter Online - Convert PNG to JPEG Instantly",
  description:
    "Convert PNG to JPG online for free. Reduce file sizes by converting PNG images to compressed JPEG format. Adjustable quality. Processed in your browser.",
  keywords: [
    "png to jpg",
    "png to jpeg",
    "convert png to jpg free",
    "png to jpg converter online",
    "change png to jpg",
    "png to jpeg free online",
    "reduce png file size",
    "png to jpg with quality control",
  ],
  openGraph: {
    title: "Free PNG to JPG Converter - Instant Online Conversion",
    description: "Convert PNG images to JPG format for smaller file sizes. Adjustable quality. Free, instant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PNG to JPG Converter - Instant Online Conversion",
    description: "Convert PNG images to JPG format for smaller file sizes. Adjustable quality. Free, instant.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
