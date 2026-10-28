import { cakes } from "@/data/cakes";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const pages = ["", "/cakes", "/order", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
  const cakePages = cakes.map((cake) => ({
    url: `${siteUrl}/cakes/${cake.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...cakePages];
}
