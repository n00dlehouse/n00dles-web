import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Simple, transparent pricing.",
  });
}
