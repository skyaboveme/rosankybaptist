import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const trumpet = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/trumpet" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    galleryDir: z.string().optional(),
    galleryCount: z.number().int().nonnegative().default(0),
    galleryExt: z.string().default(".jpg"),
    pdf: z.string().optional(),
    pdfLabel: z.string().optional(),
    pdfMissing: z.string().optional(),
  }),
});

export const collections = { trumpet };
