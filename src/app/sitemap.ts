import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://backroundremove.com";
  return [
    { url: baseUrl },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];
}
