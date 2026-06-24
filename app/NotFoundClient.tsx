"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./not-found.module.css";

export function NotFoundClient() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <nav className={styles.nav} role="navigation">
        <div className={styles["nav-inner"]}>
          <Link href="/" className={styles.logo}>n<span style={{ color: "var(--yellow)" }}>00</span>dles</Link>
          <ul className={styles["nav-links"]}>
            <li><Link href="/#features">Features</Link></li>
            <li><Link href="/docs">Docs</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
          <Link href="/login" className={styles["nav-cta"]}>Sign in</Link>
        </div>
      </nav>

      <main className={styles.main} role="main">
        <div className={styles["bg-grid"]} aria-hidden="true" />
        <div className={styles["bg-glow"]} aria-hidden="true" />

        {/* 404 ART */}
        <div className={styles["art-wrap"]} aria-hidden="true">
          <div className={styles["art-404-glow"]}>404</div>
          <div className={styles["art-404"]}>404</div>
          <svg className={styles["noodle-svg"]} viewBox="0 0 640 200" fill="none" preserveAspectRatio="none">
            <path className={styles["noodle-path-1"]} d="M0,100 C80,40 160,160 280,100 C400,40 480,160 560,100 C600,70 630,90 640,100"
              stroke="#F5C842" strokeWidth="2" strokeLinecap="round"
              strokeDasharray="1200" strokeDashoffset="1200" />
            <path className={styles["noodle-path-2"]} d="M0,120 C120,60 240,160 380,110 C480,70 560,130 640,120"
              stroke="rgba(245,200,66,.35)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="1200" strokeDashoffset="1200" />
            <path className={styles["noodle-path-3"]} d="M0,80 C100,130 220,40 340,90 C460,140 560,70 640,80"
              stroke="rgba(245,200,66,.15)" strokeWidth="1" strokeLinecap="round"
              strokeDasharray="1200" strokeDashoffset="1200" />
            <circle className={styles["noodle-dot-1"]} cx="160" cy="100" r="5" fill="#F5C842" opacity=".8" />
            <circle className={styles["noodle-dot-2"]} cx="320" cy="100" r="5" fill="#F5C842" opacity=".8" />
            <circle className={styles["noodle-dot-3"]} cx="480" cy="100" r="5" fill="#F5C842" opacity=".8" />
          </svg>
        </div>

        {/* ERROR CONTENT */}
        <div className={styles["error-eyebrow"]}>pipeline not found</div>
        <h1 className={styles["error-title"]}>These noodles went cold.</h1>
        <p className={styles["error-sub"]}>The page you&apos;re looking for doesn&apos;t exist, was moved, or your pipeline took a wrong turn somewhere between agents.</p>

        {/* TERMINAL */}
        <div className={styles["error-terminal"]} role="complementary" aria-label="Error trace">
          <div className={styles["terminal-tb"]}>
            <div className={`${styles["t-dot"]} ${styles.r}`} />
            <div className={`${styles["t-dot"]} ${styles.y}`} />
            <div className={`${styles["t-dot"]} ${styles.g}`} />
            <span className={styles["t-title"]}>trace.log</span>
          </div>
          <div className={styles["terminal-body"]}>
            <div><span className={styles["t-dollar"]}>$</span> <span className={styles["t-cmd"]}>noodles run page-resolver</span></div>
            <div style={{ color: "var(--ts)" }}>→ routing to: <span style={{ color: "var(--yellow)" }}>{pathname || "/this-page"}</span></div>
            <div className={styles["t-err"]}>✗ RouteNotFoundError: no handler for this path</div>
            <div className={styles["t-hint"]}>&nbsp; at pipeline.route() [step 2 of 3]</div>
            <div className={styles["t-hint"]}>&nbsp; retry 1/3… retry 2/3… retry 3/3…</div>
            <div className={styles["t-err"]}>✗ All retries exhausted. Pipeline halted.</div>
            <div style={{ color: "var(--ts)", marginTop: 4 }}><span className={styles["t-dollar"]}>$</span> <span className={styles["t-cursor"]} /></div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <Link href="/" className={styles["btn-primary"]}>← Back to home</Link>
          <Link href="/docs" className={styles["btn-ghost"]}>Browse docs</Link>
        </div>

        {/* QUICK LINKS */}
        <div className={styles["quick-links"]}>
          <Link href="/quickstart" className={styles["quick-link"]}>Quickstart</Link>
          <Link href="/pricing" className={styles["quick-link"]}>Pricing</Link>
          <Link href="/about" className={styles["quick-link"]}>About</Link>
          <Link href="/blog" className={styles["quick-link"]}>Blog</Link>
          <a href="https://discord.gg/n00dles" className={styles["quick-link"]}>Discord</a>
          <a href="https://github.com/n00dlehouse" className={styles["quick-link"]}>GitHub</a>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/">n00dles.io</Link>
        <a href="https://github.com/n00dlehouse">GitHub</a>
        <a href="https://discord.gg/n00dles">Discord</a>
        <Link href="/pricing">Pricing</Link>
      </footer>
    </div>
  );
}
