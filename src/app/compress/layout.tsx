import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Compressor Online - Reduce File Size Up to 90%",
  description:
    "Compress JPG, PNG, and WebP images online for free. Reduce image file sizes up to 90% without visible quality loss. No upload to servers — processed in your browser.",
  keywords: [
    "compress image online free",
    "image compressor",
    "reduce image size",
    "compress jpg online",
    "compress png online",
    "image size reducer free",
    "photo compressor",
    "reduce file size image online",
    "optimize images for web",
    "bulk image compressor",
  ],
  openGraph: {
    title: "Free Image Compressor - Reduce File Size Up to 90%",
    description: "Compress images up to 90% without losing quality. Free, instant, no sign-up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor - Reduce File Size Up to 90%",
    description: "Compress images up to 90% without losing quality. Free, instant, no sign-up.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
