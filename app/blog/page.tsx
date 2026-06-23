import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering posts from the team building n00dles, plus every version we've ever shipped.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — n00dles",
    description:
      "Engineering posts from the team building n00dles, plus every version we've ever shipped.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
