import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Multi-Agent AI Orchestration",
    title: "Your LLM pipelines are spaghetti. n00dles fixes that.",
  });
}
