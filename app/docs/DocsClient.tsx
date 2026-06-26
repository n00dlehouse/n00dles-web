"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { DOCS, SIDEBAR } from "./docsRegistry";

const DEFAULT_OPEN_SECTIONS = ["start", "concepts", "api", "guides", "ex"];

export function DocsClient() {
  const [navOpen, setNavOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(DEFAULT_OPEN_SECTIONS);
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== "undefined") {
      const id = window.location.hash.slice(1);
      if (id && DOCS[id]) return id;
    }
    return "installation";
  });

  const toggleSection = (id: string) =>
    setOpenSections((sections) =>
      sections.includes(id) ? sections.filter((x) => x !== id) : [...sections, id]
    );

  const isOpen = (id: string) => openSections.includes(id);
  const sectionClass = (id: string) => `${styles["sb-section"]}${isOpen(id) ? ` ${styles.open}` : ""}`;
  const linkClass = (id: string) => `${styles["sb-link"]}${activePage === id ? ` ${styles.active}` : ""}`;
  const paneClass = (id: string) => `${styles["doc-pane"]}${activePage === id ? ` ${styles.active}` : ""}`;
  const tocClass = (id: string) =>
    `${styles["toc-section"]}${activePage === id ? "" : ` ${styles["hidden-toc"]}`}`;

  const goTo = (id: string) => {
    setActivePage(id);
    if (!openSections.includes(sectionOf(id))) toggleSection(sectionOf(id));
  };

  const sectionOf = (id: string) => SIDEBAR.find((s) => s.items.some((i) => i.id === id))?.id ?? "start";

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles["nav-inner"]}>
          <Link href="/" className={styles.logo}>n<span className={styles.accent}>00</span>dles</Link>
          <ul className={styles["nav-links"]}>
            <li><Link href="/#features">Features</Link></li>
            <li><Link href="/docs" className={styles.active}>Docs</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
          <div className={styles["nav-right"]}>
            <a href="https://github.com/n00dlehouse" className={styles["nav-cta"]}>★ GitHub</a>
            <button
              className={`${styles.hamburger}${navOpen ? ` ${styles["is-open"]}` : ""}`}
              onClick={() => setNavOpen((o) => !o)}
              aria-label="Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles["mobile-nav"]}${navOpen ? ` ${styles["is-open"]}` : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </div>

      <div className={styles["docs-wrap"]}>
        {/* SIDEBAR */}
        <aside className={styles["docs-sidebar"]} role="navigation" aria-label="Documentation navigation">
          <div className={styles["sb-search"]}>
            <span className={styles["sb-search-icon"]}>⌕</span>
            <input type="text" placeholder="Search docs..." aria-label="Search documentation" />
          </div>
          <div className={styles["sb-version"]}>
            <span>n00dles</span>
            <span className={styles["sb-version-badge"]}>v0.1.0</span>
          </div>

          {SIDEBAR.map((section) => (
            <div key={section.id} className={sectionClass(section.id)}>
              <div className={styles["sb-section-hd"]} onClick={() => toggleSection(section.id)}>
                <span className={styles["sb-section-hd-text"]}>{section.label}</span>
                <span className={styles["sb-chevron"]}>›</span>
              </div>
              <div className={styles["sb-items"]}>
                {section.items.map((item) => (
                  <span key={item.id} className={linkClass(item.id)} onClick={() => setActivePage(item.id)}>
                    {item.label}
                    {item.soon && <span className={styles["soon-badge"]}>Soon</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles["docs-main"]}>
          {Object.values(DOCS).map((entry) => (
            <div key={entry.id} className={paneClass(entry.id)}>
              <div className={styles["doc-breadcrumb"]}>{entry.meta.section} <span>›</span> {entry.meta.title}</div>
              <h1 className={styles["doc-title"]}>{entry.meta.title}</h1>
              <p className={styles["doc-lead"]}>{entry.meta.lead}</p>

              <entry.Body styles={styles} goTo={goTo} />

              <div className={styles["doc-nav"]}>
                {entry.prev ? (
                  <span className={`${styles["doc-nav-link"]} ${styles.prev}`} onClick={() => goTo(entry.prev!)}>
                    <span className={styles["nav-dir"]}>← PREV</span>
                    <span className={styles["nav-title"]}>{DOCS[entry.prev].meta.title}</span>
                  </span>
                ) : <div />}
                {entry.next ? (
                  <span className={`${styles["doc-nav-link"]} ${styles.next}`} onClick={() => goTo(entry.next!)}>
                    <span className={styles["nav-dir"]}>NEXT →</span>
                    <span className={styles["nav-title"]}>{DOCS[entry.next].meta.title}</span>
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </main>

        {/* TOC */}
        <div className={styles["docs-toc"]} aria-label="On this page">
          <div className={styles["toc-label"]}>On this page</div>
          {Object.values(DOCS).map((entry) => (
            <div key={entry.id} className={tocClass(entry.id)}>
              {entry.meta.toc.map((heading, i) => (
                <a key={heading} className={`${styles["toc-link"]}${i === 0 ? ` ${styles.active}` : ""}`}>
                  {heading}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles["docs-footer"]}>
        <div>© 2026 n00dles · <a href="https://github.com/n00dlehouse">GitHub</a> · <a href="https://discord.gg/n00dles">Discord</a></div>
        <div>Edit this page on <a href="https://github.com/n00dlehouse">GitHub →</a></div>
      </div>
    </>
  );
}
