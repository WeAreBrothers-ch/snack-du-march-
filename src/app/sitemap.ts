import type { MetadataRoute } from "next";
import { SITE } from "@/lib/infos";

const PAGES = ["", "/la-maison", "/la-carte", "/traiteur", "/nous-trouver"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((chemin) => ({
    url: `${SITE.url}${chemin}`,
    changeFrequency: "monthly",
    priority: chemin === "" ? 1 : 0.8,
  }));
}
