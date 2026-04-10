import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Resizer Online - Resize Photos to Any Size in Pixels",
  description:
    "Resize images to exact pixel dimensions online for free. Social media presets for Instagram, Facebook, YouTube, Twitter. Aspect ratio lock. Processed in your browser.",
  keywords: [
    "resize image online free",
    "image resizer",
    "photo resizer online",
    "resize picture pixels",
    "change image dimensions",
    "resize image for instagram",
    "resize image for facebook",
    "free image resizer no watermark",
    "social media image resizer",
  ],
  openGraph: {
    title: "Free Image Resizer - Resize to Any Dimension Instantly",
    description: "Resize images to exact pixels. Social media presets included. Free, instant, no sign-up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer - Resize to Any Dimension Instantly",
    description: "Resize images to exact pixels. Social media presets included. Free, instant, no sign-up.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
