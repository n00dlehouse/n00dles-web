import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/ogImage";
import { getPost } from "../blogRegistry";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    eyebrow: post?.meta.tag ?? "Writing",
    title: post?.meta.title ?? "n00dles blog",
  });
}
