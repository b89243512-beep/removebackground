import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backroundremove.com"),
  title: {
    default: "Free Remove Background - Remove Image Background Instantly with AI",
    template: "%s | Free Remove Background",
  },
  description:
    "Free Remove Background removes image backgrounds automatically in seconds using AI. Upload any photo and get a clean, transparent background — 100% free, no sign-up required.",
  keywords: [
    "free remove background",
    "remove background from image",
    "background remover free",
    "remove bg",
    "transparent background maker",
    "ai background remover",
    "remove image background online",
    "photo background eraser",
    "background removal tool",
    "remove background free online",
    "png maker transparent",
    "cut out image background",
    "product photo background removal",
    "headshot background remover",
  ],
  openGraph: {
    title: "Free Remove Background - Remove Image Background Instantly with AI",
    description:
      "Upload any photo and remove its background in seconds. AI-powered, 100% free, no sign-up required.",
    type: "website",
    url: "https://backroundremove.com",
    siteName: "Free Remove Background",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Remove Background - Remove Image Background Instantly with AI",
    description:
      "Upload any photo and remove its background in seconds. AI-powered, 100% free, no sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://backroundremove.com",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  verification: {
    google: "xGJEObxCTl0CCVsHK5k5q5341MKHXTP1aJGMWzRG3Hg",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  category: "design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Free Remove Background",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              description:
                "Free AI-powered tool that removes image backgrounds automatically in seconds. Get transparent PNG files instantly.",
              url: "https://backroundremove.com",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Remove Background",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is Free Remove Background really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Free Remove Background is 100% free. You can remove backgrounds from unlimited images without any hidden fees, subscriptions, or sign-up requirements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What image formats does Free Remove Background support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free Remove Background supports JPG, JPEG, PNG, and WebP formats. The output is always a high-quality transparent PNG file.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate is the background removal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free Remove Background uses advanced AI trained on millions of images. It accurately detects subjects including people, products, animals, and objects with precise edge detection even around hair and fine details.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use Free Remove Background on my phone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Free Remove Background works on any device with a web browser — smartphones, tablets, and desktops. No app download required.",
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-FSG7R35XXT" />
    </html>
  );
}
