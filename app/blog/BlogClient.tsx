"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import { FEATURED_SLUG, POSTS } from "./blogRegistry";
import styles from "./page.module.css";

export function BlogClient() {
  useReveal();
  const [tab, setTab] = useState<"blog" | "cl">(() =>
    typeof window !== "undefined" && window.location.hash === "#cl" ? "cl" : "blog"
  );
  const isBlog = tab === "blog";

  const featured = POSTS.find((p) => p.meta.slug === FEATURED_SLUG)!;
  const gridPosts = POSTS.filter((p) => p.meta.slug !== FEATURED_SLUG);

  return (
    <>
      <MarketingNav active="blog" />

      <div className={styles["blog-hero"]}>
        <div className={styles.container}>
          <div className={styles["blog-hero-inner"]}>
            <div data-reveal>
              <div className={styles.eyebrow}>Writing</div>
              <h1>
                Ideas, updates,
                <br />
                and hard-won lessons.
              </h1>
              <p>Engineering posts from the team building n00dles, plus every version we&apos;ve ever shipped.</p>
            </div>
            <div className={styles["tab-bar"]} data-reveal data-delay="2">
              <button
                className={`${styles["tab-pill"]}${isBlog ? ` ${styles.active}` : ""}`}
                onClick={() => setTab("blog")}
              >
                Blog
              </button>
              <button
                className={`${styles["tab-pill"]}${!isBlog ? ` ${styles.active}` : ""}`}
                onClick={() => setTab("cl")}
              >
                Changelog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BLOG */}
      <div className={`${styles["blog-tab"]}${isBlog ? ` ${styles.active}` : ""}`}>
        <div className={styles.container}>
          <Link href={`/blog/${featured.meta.slug}`} className={styles["featured-post"]} data-reveal>
            <div className={styles["featured-img"]}>
              <div className={styles["featured-img-bg"]} aria-hidden="true" />
              <svg viewBox="0 0 300 160" fill="none" style={{ width: "100%", maxWidth: 300, position: "relative", zIndex: 1 }}>
                <path className={styles["noodle-path-1"]} d="M0,80 C60,30 120,140 180,80 C240,20 280,110 300,80" stroke="#F5C842" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="800" strokeDashoffset="800" />
                <path className={styles["noodle-path-2"]} d="M0,100 C80,50 160,140 240,90 C270,70 290,85 300,90" stroke="rgba(245,200,66,.35)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="800" strokeDashoffset="800" />
                <circle cx="75" cy="80" r="5" fill="#F5C842" opacity="0.9" />
                <circle cx="180" cy="80" r="5" fill="#F5C842" opacity="0.9" />
                <circle cx="255" cy="90" r="5" fill="#F5C842" opacity="0.9" />
                <text x="75" y="67" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="rgba(245,200,66,.7)" textAnchor="middle">problem</text>
                <text x="180" y="67" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="rgba(245,200,66,.7)" textAnchor="middle">attempt</text>
                <text x="255" y="77" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="rgba(245,200,66,.7)" textAnchor="middle">n00dles</text>
              </svg>
            </div>
            <div className={styles["featured-content"]}>
              <div className={styles["post-tag"]}>Featured</div>
              <div className={styles["featured-title"]}>{featured.meta.title}</div>
              <div className={styles["featured-excerpt"]}>{featured.meta.excerpt}</div>
              <div className={styles["post-meta"]}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className={styles["post-av"]}>{featured.meta.author.initials[0]}</div>
                  {featured.meta.author.name}
                </div>
                <span style={{ color: "var(--border-mid)" }}>·</span>
                <span>{featured.meta.date}</span>
                <span style={{ color: "var(--border-mid)" }}>·</span>
                <span>{featured.meta.readTime}</span>
              </div>
            </div>
          </Link>

          <div className={styles["posts-grid"]}>
            {gridPosts.map((p, i) => (
              <Link
                key={p.meta.slug}
                href={`/blog/${p.meta.slug}`}
                className={styles["post-card"]}
                data-reveal
                data-delay={String((i % 3) + 1)}
              >
                <div className={styles["post-card-tag"]}>{p.meta.tag}</div>
                <div className={styles["post-card-title"]}>{p.meta.title}</div>
                <div className={styles["post-card-excerpt"]}>{p.meta.excerpt}</div>
                <div className={styles["post-card-meta"]}>
                  <span>{p.meta.author.name} · {p.meta.date.replace(/, \d{4}$/, "")}</span>
                  <span className={styles["read-more"]}>{p.meta.readTime} →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.newsletter} data-reveal>
            <div><h3>New posts in your inbox.</h3><p>Once or twice a month. No spam.</p></div>
            <div className={styles["nl-form"]}>
              <input className={styles["nl-input"]} type="email" placeholder="you@company.com" aria-label="Email" />
              <button className={styles["nl-btn"]}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGELOG */}
      <div className={`${styles["blog-tab"]}${!isBlog ? ` ${styles.active}` : ""}`}>
        <div className={styles.container}>
          <div className={styles["changelog-wrap"]}>
            <div className={styles["cl-entry"]} data-reveal>
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.2.0</div><div className={styles["cl-date"]}>Jun 2026</div></div>
              <div className={`${styles["cl-dot"]} ${styles.major}`} />
              <div>
                <div className={styles["cl-title"]}>Parallel execution and conditional routing</div>
                <div className={styles["cl-desc"]}>Fan-out and branching, the two biggest gaps from the v0.1.0 sequential-only release.</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>parallel()</code> and the <code className={styles["mono-sm"]}>|</code> operator — concurrent fan-out with automatic result merging by agent name</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>branch()</code> — route to one of several agents based on a classifier&apos;s output</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>max_concurrency</code> on <code className={styles["mono-sm"]}>parallel()</code> for rate-limit-conscious fan-out</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.imp}`}>IMP</span>Partial-resume now checkpoints each member of a <code className={styles["mono-sm"]}>parallel()</code> group independently</li>
                </ul>
              </div>
            </div>
            <div className={styles["cl-entry"]} data-reveal>
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.1.0</div><div className={styles["cl-date"]}>Apr 2026</div></div>
              <div className={styles["cl-dot"]} />
              <div>
                <div className={styles["cl-title"]}>Public beta — open source release</div>
                <div className={styles["cl-desc"]}>First public release. Sequential composition only — see the post below for what was deliberately left out.</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>@agent</code> decorator with full type validation</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>pipeline()</code> and <code className={styles["mono-sm"]}>&gt;&gt;</code> for sequential composition, plus <code className={styles["mono-sm"]}>run()</code>/<code className={styles["mono-sm"]}>arun()</code></li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Provider support for Anthropic, OpenAI, Mistral, Gemini, Ollama, and more via litellm</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Retry with exponential backoff + jitter, per-node timeouts, and fallback agents</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>SQLite state store with checkpoint-and-resume, on by default</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Pydantic v2 validation for structured agent outputs</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Structured trace events with an optional OpenTelemetry exporter</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: "var(--r-md)", background: "var(--ydim)", border: "1px solid var(--border-mid)", fontSize: 14, lineHeight: 1.6, color: "var(--ts)" }}>
              🔜 Circuit breaker, distributed (Redis/Postgres) state backends, Langfuse/Helicone exporters,
              mock testing utilities, and the <code className={styles["mono-sm"]}>noodles</code> deploy CLI
              are all on the roadmap and described in the docs, but none have shipped yet — see{" "}
              <Link href="/docs">the docs</Link> for current status on each.
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles["footer-grid"]}>
            <div className={styles["footer-brand"]}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 20, fontWeight: 700 }}>n<span className={styles.accent}>00</span>dles</div>
              <p>Open-source multi-agent AI orchestration.</p>
            </div>
            <div className={styles["footer-col"]}><h5>Product</h5><ul><li><Link href="/#features">Features</Link></li><li><Link href="/pricing">Pricing</Link></li></ul></div>
            <div className={styles["footer-col"]}><h5>Developers</h5><ul><li><Link href="/docs">Docs</Link></li><li><Link href="/quickstart">Quickstart</Link></li><li><a href="https://github.com/n00dlehouse">GitHub</a></li></ul></div>
            <div className={styles["footer-col"]}><h5>Company</h5><ul><li><Link href="/about">About</Link></li><li><Link href="/blog">Blog</Link></li><li><a href="https://discord.gg/n00dles">Discord</a></li></ul></div>
          </div>
          <div className={styles["footer-bottom"]}><span>© 2026 n00dles. MIT License.</span><span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>v0.2.0-beta</span></div>
        </div>
      </footer>
    </>
  );
}
