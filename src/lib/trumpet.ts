import { getCollection, type CollectionEntry } from "astro:content";

export type TrumpetEntry = CollectionEntry<"trumpet">;

export function galleryImages(entry: TrumpetEntry) {
  const { galleryDir, galleryCount, galleryExt } = entry.data;
  if (!galleryDir || galleryCount < 1) return [];
  return Array.from({ length: galleryCount }, (_, index) => {
    const n = String(index + 1).padStart(2, "0");
    return `${galleryDir}/${n}${galleryExt}`;
  });
}

export async function allPosts() {
  const posts = await getCollection("trumpet");
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function termHref(kind: "category" | "tag", term: string) {
  return `/trumpet/${kind}/${encodeURIComponent(term)}`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
