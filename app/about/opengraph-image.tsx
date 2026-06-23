import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "About n00dles",
    title: "We're building the framework we always wanted.",
  });
}
