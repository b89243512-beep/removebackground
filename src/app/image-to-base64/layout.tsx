import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image to Base64 Converter Online - Encode Images Instantly",
  description:
    "Convert image to Base64 string online for free. Encode JPG, PNG, WebP, GIF, SVG to Base64 for data URIs. HTML, CSS, and JSON ready. Processed in your browser, 100% private.",
  keywords: [
    "image to base64",
    "image to base64 converter",
    "convert image to base64",
    "jpg to base64",
    "png to base64",
    "base64 encode image",
    "image to data uri",
    "image to data url",
    "free image to base64 online",
    "base64 image converter",
    "encode image base64",
    "image base64 generator",
  ],
  openGraph: {
    title: "Free Image to Base64 Converter - Encode Images Instantly",
    description: "Convert any image to Base64 string. Data URI ready for HTML, CSS, JSON. Free, instant, private.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Base64 Converter - Encode Images Instantly",
    description: "Convert any image to Base64 string. Data URI ready for HTML, CSS, JSON. Free, instant, private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
