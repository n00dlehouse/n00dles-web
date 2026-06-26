import * as whyWeBuilt from "./posts/why-we-built-n00dles";
import * as parallelAgents from "./posts/parallel-agents-one-line";
import * as stateManagement from "./posts/state-management-production-pipelines";
import * as hiddenCost from "./posts/hidden-cost-of-langchain";
import * as deepResearch from "./posts/deep-research-pipeline-50-lines";
import * as retries from "./posts/how-we-think-about-retries";
import * as announcing from "./posts/announcing-v0-1-0-public-beta";
import type { BlogBodyProps, BlogMeta } from "./posts/types";

type BlogPostModule = { meta: BlogMeta; Body: (props: BlogBodyProps) => React.ReactElement };

/** Newest first — drives both the index grid order and the changelog-adjacent feel of the blog. */
export const POSTS: BlogPostModule[] = [
  whyWeBuilt,
  parallelAgents,
  stateManagement,
  hiddenCost,
  deepResearch,
  retries,
  announcing,
];

export const FEATURED_SLUG = whyWeBuilt.meta.slug;

export function getPost(slug: string): BlogPostModule | undefined {
  return POSTS.find((p) => p.meta.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.meta.slug);
}
