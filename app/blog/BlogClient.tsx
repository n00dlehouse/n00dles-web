"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import styles from "./page.module.css";

export function BlogClient() {
  useReveal();
  const [tab, setTab] = useState<"blog" | "cl">("blog");
  const isBlog = tab === "blog";

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
          <div className={styles["featured-post"]} data-reveal>
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
              <div className={styles["featured-title"]}>Why we built n00dles from scratch instead of patching LangChain</div>
              <div className={styles["featured-excerpt"]}>Six months, 4,000 lines of boilerplate, and one 2am incident later — we decided the existing options weren&apos;t good enough. Here&apos;s the full story.</div>
              <div className={styles["post-meta"]}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className={styles["post-av"]}>Z</div>Zara Okonkwo</div>
                <span style={{ color: "var(--border-mid)" }}>·</span>
                <span>June 18, 2026</span>
                <span style={{ color: "var(--border-mid)" }}>·</span>
                <span>9 min</span>
              </div>
            </div>
          </div>

          <div className={styles["posts-grid"]}>
            <div className={styles["post-card"]} data-reveal data-delay="1">
              <div className={styles["post-card-tag"]}>Engineering</div>
              <div className={styles["post-card-title"]}>Parallel agents with one line of code</div>
              <div className={styles["post-card-excerpt"]}>Most LLM pipelines are embarrassingly sequential. Here&apos;s how n00dles&apos; parallel() primitive works under the hood.</div>
              <div className={styles["post-card-meta"]}><span>Ryo Tanaka · May 31</span><span className={styles["read-more"]}>6 min →</span></div>
            </div>
            <div className={styles["post-card"]} data-reveal data-delay="2">
              <div className={styles["post-card-tag"]}>Production</div>
              <div className={styles["post-card-title"]}>State management in production LLM pipelines</div>
              <div className={styles["post-card-excerpt"]}>Checkpointing, distributed locks, crash recovery, and why your in-memory state store will eventually betray you.</div>
              <div className={styles["post-card-meta"]}><span>Leo Marchetti · May 22</span><span className={styles["read-more"]}>11 min →</span></div>
            </div>
            <div className={styles["post-card"]} data-reveal data-delay="3">
              <div className={styles["post-card-tag"]}>Opinion</div>
              <div className={styles["post-card-title"]}>The hidden cost of LangChain</div>
              <div className={styles["post-card-excerpt"]}>It&apos;s not just the boilerplate. The real cost is the abstraction debt you accumulate every time you paper over a bad API.</div>
              <div className={styles["post-card-meta"]}><span>Zara Okonkwo · May 8</span><span className={styles["read-more"]}>7 min →</span></div>
            </div>
            <div className={styles["post-card"]} data-reveal data-delay="1">
              <div className={styles["post-card-tag"]}>Tutorial</div>
              <div className={styles["post-card-title"]}>Building a deep research pipeline in 50 lines</div>
              <div className={styles["post-card-excerpt"]}>Web scraping, parallel analysis, synthesis, and structured output — all wired with n00dles in one afternoon.</div>
              <div className={styles["post-card-meta"]}><span>Priya Sharma · April 29</span><span className={styles["read-more"]}>14 min →</span></div>
            </div>
            <div className={styles["post-card"]} data-reveal data-delay="2">
              <div className={styles["post-card-tag"]}>Deep dive</div>
              <div className={styles["post-card-title"]}>How we think about retries in multi-agent systems</div>
              <div className={styles["post-card-excerpt"]}>Not all failures are equal. Transient errors, rate limits, semantic failures, and timeouts each need their own strategy.</div>
              <div className={styles["post-card-meta"]}><span>Leo Marchetti · April 14</span><span className={styles["read-more"]}>8 min →</span></div>
            </div>
            <div className={styles["post-card"]} data-reveal data-delay="3">
              <div className={styles["post-card-tag"]}>Release</div>
              <div className={styles["post-card-title"]}>Announcing n00dles v0.1.0 — public beta</div>
              <div className={styles["post-card-excerpt"]}>After six months of internal development and two production deployments, we&apos;re open-sourcing n00dles.</div>
              <div className={styles["post-card-meta"]}><span>Zara Okonkwo · April 1</span><span className={styles["read-more"]}>5 min →</span></div>
            </div>
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
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.1.0</div><div className={styles["cl-date"]}>Jun 2026</div></div>
              <div className={`${styles["cl-dot"]} ${styles.major}`} />
              <div>
                <div className={styles["cl-title"]}>Public beta — open source release</div>
                <div className={styles["cl-desc"]}>First public release. Everything is stable enough for production use. Expect breaking changes before v1.0.</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>@agent</code> decorator with full type validation</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>pipeline()</code>, <code className={styles["mono-sm"]}>parallel()</code>, <code className={styles["mono-sm"]}>branch()</code> primitives</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Support for Anthropic, OpenAI, Mistral, Gemini, Ollama</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Persistent state store (Redis + SQLite adapters)</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Structured trace logging with OpenTelemetry export</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>noodles deploy</code> CLI command</li>
                </ul>
              </div>
            </div>
            <div className={styles["cl-entry"]} data-reveal>
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.0.9</div><div className={styles["cl-date"]}>May 2026</div></div>
              <div className={styles["cl-dot"]} />
              <div>
                <div className={styles["cl-title"]}>Parallel execution + Pydantic validation</div>
                <div className={styles["cl-desc"]}>Rewrote the executor to use a proper async task graph instead of sequential coroutines.</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>parallel()</code> with automatic fan-out and result merging</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Pydantic v2 models as agent output types</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.imp}`}>IMP</span>40% reduction in per-agent overhead</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.fix}`}>FIX</span>State deserialization edge case with nested dicts</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.fix}`}>FIX</span>Timeout not propagated correctly in nested pipelines</li>
                </ul>
              </div>
            </div>
            <div className={styles["cl-entry"]} data-reveal>
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.0.8</div><div className={styles["cl-date"]}>Apr 2026</div></div>
              <div className={styles["cl-dot"]} />
              <div>
                <div className={styles["cl-title"]}>Retry engine + circuit breaker</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Exponential backoff with jitter per agent</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Circuit breaker — opens after N consecutive failures</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Per-provider rate limit detection and backoff</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.brk}`}>BRK</span><code className={styles["mono-sm"]}>on_error</code> callback signature changed — see migration guide</li>
                </ul>
              </div>
            </div>
            <div className={styles["cl-entry"]} data-reveal>
              <div className={styles["cl-date-col"]}><div className={styles["cl-version"]}>v0.0.7</div><div className={styles["cl-date"]}>Mar 2026</div></div>
              <div className={styles["cl-dot"]} />
              <div>
                <div className={styles["cl-title"]}>Initial internal alpha</div>
                <div className={styles["cl-desc"]}>First version used in production. Sequential pipelines only, no parallel support. But it worked.</div>
                <ul className={styles["cl-items"]}>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span><code className={styles["mono-sm"]}>@agent</code> decorator (sequential only)</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Basic <code className={styles["mono-sm"]}>&gt;&gt;</code> pipeline chaining</li>
                  <li><span className={`${styles["cl-badge"]} ${styles.new}`}>NEW</span>Anthropic and OpenAI providers</li>
                </ul>
              </div>
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
            <div className={styles["footer-col"]}><h5>Developers</h5><ul><li><Link href="/docs">Docs</Link></li><li><Link href="/quickstart">Quickstart</Link></li><li><a href="https://github.com/n00dles/n00dles">GitHub</a></li></ul></div>
            <div className={styles["footer-col"]}><h5>Company</h5><ul><li><Link href="/about">About</Link></li><li><Link href="/blog">Blog</Link></li><li><a href="https://discord.gg/n00dles">Discord</a></li></ul></div>
          </div>
          <div className={styles["footer-bottom"]}><span>© 2026 n00dles. MIT License.</span><span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>v0.1.0-beta</span></div>
        </div>
      </footer>
    </>
  );
}
