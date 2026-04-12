import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://backroundremove.com";
  return [
    { url: baseUrl },
    { url: `${baseUrl}/tools` },
    { url: `${baseUrl}/compress` },
    { url: `${baseUrl}/jpg-to-png` },
    { url: `${baseUrl}/png-to-jpg` },
    { url: `${baseUrl}/resize` },
    { url: `${baseUrl}/image-to-base64` },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];
}
