"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MarketingNav.module.css";

type ActivePage = "docs" | "pricing" | "about" | "blog";

export function MarketingNav({ active }: { active?: ActivePage }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const linkClass = (id: ActivePage) => (active === id ? styles.active : undefined);

  return (
    <>
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <div className={styles["nav-inner"]}>
          <Link href="/" className={styles.logo} aria-label="n00dles home">
            n<span className={styles.accent}>00</span>dles
          </Link>
          <ul className={styles["nav-links"]}>
            <li><Link href="/#features">Features</Link></li>
            <li><Link href="/docs" className={linkClass("docs")}>Docs</Link></li>
            <li><Link href="/pricing" className={linkClass("pricing")}>Pricing</Link></li>
            <li><Link href="/about" className={linkClass("about")}>About</Link></li>
            <li><Link href="/blog" className={linkClass("blog")}>Blog</Link></li>
          </ul>
          <div className={styles["nav-right"]}>
            <a href="https://github.com/n00dlehouse" className={styles["nav-cta"]}>
              ★ Star on GitHub
            </a>
            <button
              className={`${styles.hamburger}${open ? ` ${styles["is-open"]}` : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles["mobile-nav"]}${open ? ` ${styles["is-open"]}` : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <Link href="/" onClick={close}>Home</Link>
        <Link href="/#features" onClick={close}>Features</Link>
        <Link href="/docs" onClick={close}>Docs</Link>
        <Link href="/pricing" onClick={close}>Pricing</Link>
        <Link href="/about" onClick={close}>About</Link>
        <Link href="/blog" onClick={close}>Blog</Link>
        <a href="https://github.com/n00dlehouse" className={styles.accent}>
          ★ Star on GitHub
        </a>
      </div>
    </>
  );
}
