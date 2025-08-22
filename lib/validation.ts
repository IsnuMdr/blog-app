import { z } from "zod";

export const formSchema = z.object({
  author: z
    .string()
    .min(3, { error: "Too short! Minimum text is 3 characters." })
    .max(50, { error: "Too long! Maximum text is 50 characters." }),
  title: z
    .string()
    .min(3, { error: "Too short! Minimum text is 3 characters." })
    .max(100, { error: "Too long! Maximum text is 100 characters." }),
  content: z
    .string()
    .min(100, { error: "Too short! Minimum text is 100 characters." }),
  summary: z
    .string()
    .min(20, { error: "Too short! Minimum text is 20 characters." })
    .max(300, { error: "Too long! Maximum text is 300 characters." }),
  category: z
    .string()
    .min(3, { error: "Too short! Minimum text is 3 characters." }),
  image: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, {
          method: "HEAD",
          headers: { as: "image" },
        });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    })
    .nullable(),
});
