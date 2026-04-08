import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Free Remove Background - AI Background Remover",
    short_name: "Remove BG",
    description:
      "Remove image backgrounds instantly with AI. Upload any photo and get a transparent PNG in seconds — 100% free.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
