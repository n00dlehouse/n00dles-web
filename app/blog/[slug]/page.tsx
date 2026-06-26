import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { getAllSlugs, getPost, POSTS } from "../blogRegistry";
import docStyles from "../../docs/page.module.css";
import blogStyles from "../page.module.css";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const { title, excerpt } = post.meta;
  return {
    title,
    description: excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${title} — n00dles`,
      description: excerpt,
      url: `/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, Body } = post;
  const morePosts = POSTS.filter((p) => p.meta.slug !== slug).slice(0, 3);

  return (
    <>
      <MarketingNav active="blog" />

      <div className={styles["article-hero"]}>
        <div className={blogStyles.container}>
          <Link href="/blog" className={styles["back-link"]}>
            ← Back to blog
          </Link>
          <div className={styles["article-tag"]}>{meta.tag}</div>
          <h1 className={styles["article-title"]}>{meta.title}</h1>
          <div className={styles.byline}>
            <div className={styles["byline-av"]}>{meta.author.initials}</div>
            <div>
              <div className={styles["byline-name"]}>{meta.author.name}</div>
              <div className={styles["byline-role"]}>{meta.author.role}</div>
            </div>
            <div className={styles["byline-meta"]}>
              <span>{meta.date}</span>
              <span style={{ color: "var(--border-mid)" }}>·</span>
              <span>{meta.readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["article-wrap"]}>
        <div className={blogStyles.container} style={{ display: "flex", justifyContent: "center" }}>
          <article className={styles["article-body"]}>
            <Body styles={docStyles} />
          </article>
        </div>
      </div>

      <div className={styles["more-section"]}>
        <div className={blogStyles.container}>
          <div className={styles["more-label"]}>More from the blog</div>
          <div className={blogStyles["posts-grid"]}>
            {morePosts.map((p) => (
              <Link key={p.meta.slug} href={`/blog/${p.meta.slug}`} className={blogStyles["post-card"]}>
                <div className={blogStyles["post-card-tag"]}>{p.meta.tag}</div>
                <div className={blogStyles["post-card-title"]}>{p.meta.title}</div>
                <div className={blogStyles["post-card-excerpt"]}>{p.meta.excerpt}</div>
                <div className={blogStyles["post-card-meta"]}>
                  <span>{p.meta.author.name} · {p.meta.date.replace(/, \d{4}$/, "")}</span>
                  <span className={blogStyles["read-more"]}>{p.meta.readTime} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className={blogStyles.footer}>
        <div className={blogStyles.container}>
          <div className={blogStyles["footer-grid"]}>
            <div className={blogStyles["footer-brand"]}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 20, fontWeight: 700 }}>
                n<span className={blogStyles.accent}>00</span>dles
              </div>
              <p>Open-source multi-agent AI orchestration.</p>
            </div>
            <div className={blogStyles["footer-col"]}>
              <h5>Product</h5>
              <ul>
                <li><Link href="/#features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className={blogStyles["footer-col"]}>
              <h5>Developers</h5>
              <ul>
                <li><Link href="/docs">Docs</Link></li>
                <li><Link href="/quickstart">Quickstart</Link></li>
                <li><a href="https://github.com/n00dlehouse">GitHub</a></li>
              </ul>
            </div>
            <div className={blogStyles["footer-col"]}>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><a href="https://discord.gg/n00dles">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className={blogStyles["footer-bottom"]}>
            <span>© 2026 n00dles. MIT License.</span>
            <span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>v0.2.0-beta</span>
          </div>
        </div>
      </footer>
    </>
  );
}
