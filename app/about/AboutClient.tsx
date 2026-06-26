"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import { DEPT_FILTERS, TEAM, type Dept, type TeamMember } from "./team";
import styles from "./page.module.css";

const JOBS = [
  { title: "Senior Backend Engineer", tags: ["Engineering", "Remote", "Python / Rust"] },
  { title: "ML Infrastructure Engineer", tags: ["Engineering", "Remote", "LLM Systems"] },
  { title: "Developer Advocate (APAC)", tags: ["GTM", "Remote — APAC", "DevRel"] },
  { title: "Product Designer", tags: ["Design", "Remote", "Developer Tools"] },
];

export function AboutClient() {
  useReveal();
  const [activeDept, setActiveDept] = useState<"all" | Dept>("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedMember]);

  return (
    <>
      <MarketingNav active="about" />

      {/* HERO */}
      <section className={styles["about-hero"]}>
        <div className={styles["about-hero-bg"]} aria-hidden="true" />
        <div className={styles["about-hero-grid"]} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles["about-hero-content"]}>
            <div className={styles["hero-eyebrow"]}>About n00dles</div>
            <h1>
              We&apos;re building the
              <br />
              <em>framework we always wanted.</em>
            </h1>
            <p className={styles["about-hero-sub"]}>
              n00dles started as a weekend project to fix the one thing that made us want to quit
              building with LLMs. It&apos;s grown into something we&apos;re proud to ship.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className={styles["story-section"]}>
        <div className={styles.container}>
          <div className={styles["story-grid"]}>
            <div className={styles["story-text"]} data-reveal>
              <h2>Six months of LangChain before we broke.</h2>
              <p>
                In late 2024, our team was building a multi-agent research system for a fintech
                client. We chose LangChain because it was the obvious choice.{" "}
                <strong>
                  Six months later, we had 4,000 lines of orchestration code and a system that
                  failed 1 in 10 times under production load.
                </strong>
              </p>
              <p>
                We tried CrewAI. Better ergonomics, but the state management still wasn&apos;t
                there. We tried LangGraph — closer to what we wanted, but the learning curve was
                steep and the deploy story was non-existent.
              </p>
              <p>
                So we did what engineers do when nothing fits:{" "}
                <strong>we built it ourselves.</strong>{" "}
                First as an internal library, then as an open-source project, then as the thing
                you&apos;re reading about right now.
              </p>
              <p>
                n00dles is our answer to the question &quot;what would a multi-agent framework
                look like if it was designed for production from day one, by people who&apos;ve
                had their pipelines wake them up at 2am?&quot;
              </p>

              <h3 className={styles["metaphor-heading"]}>Okay, but why &quot;noodles&quot;?</h3>
              <p>
                We get asked this constantly, and honestly, the metaphor holds up better than we
                expected when we picked the name over beers:
              </p>
              <ul className={styles["metaphor-list"]}>
                <li>
                  <span className={styles["metaphor-icon"]}>🍜</span>
                  <span><strong>Noodles are long, connected, tangled threads</strong> — that&apos;s an agent chain. One agent&apos;s output twists straight into the next agent&apos;s input.</span>
                </li>
                <li>
                  <span className={styles["metaphor-icon"]}>⛓</span>
                  <span><strong>Multiple noodles in one bowl</strong> — that&apos;s parallel agents. A dozen pipelines can run at once, sharing the same plate, never tangling with each other.</span>
                </li>
                <li>
                  <span className={styles["metaphor-icon"]}>🥣</span>
                  <span><strong>A bowl holds it all together</strong> — that&apos;s the orchestration runtime. Without it, you just have a mess of cold noodles on the counter. With it, dinner&apos;s ready.</span>
                </li>
              </ul>
            </div>
            <div className={styles["story-aside"]} data-reveal data-delay="2">
              <div className={styles["story-stat"]}>
                <div className={styles["story-stat-num"]}>6 mo</div>
                <div className={styles["story-stat-label"]}>of internal development before open-sourcing</div>
                <div className={styles["story-stat-sub"]}>We dogfood everything before shipping it.</div>
              </div>
              <div className={styles["story-stat"]}>
                <div className={styles["story-stat-num"]}>3</div>
                <div className={styles["story-stat-label"]}>production systems running on n00dles</div>
                <div className={styles["story-stat-sub"]}>Including our own cloud infrastructure.</div>
              </div>
              <div className={styles["story-stat"]}>
                <div className={styles["story-stat-num"]}>MIT</div>
                <div className={styles["story-stat-label"]}>license, no strings, forever</div>
                <div className={styles["story-stat-sub"]}>The core framework will never be paywalled.</div>
              </div>
              <div className={styles["story-stat"]}>
                <div className={styles["story-stat-num"]}>2026</div>
                <div className={styles["story-stat-label"]}>founded in London, building everywhere</div>
                <div className={styles["story-stat-sub"]}>Fully remote-first from day one.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className={styles["values-section"]}>
        <div className={styles.container}>
          <div style={{ textAlign: "center" }} data-reveal>
            <div className={styles["section-eyebrow"]}>How we work</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              The n<span className={styles.accent}>00</span>dles philosophy
            </h2>
          </div>
          <div className={styles["values-grid"]} data-reveal>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>&gt;&gt;</span>
              <div className={styles["value-title"]}>Ship before perfect</div>
              <div className={styles["value-body"]}>Every feature ships when it works, not when it&apos;s flawless. We iterate in public, break things in dev, and learn from real usage. Perfect is the enemy of production.</div>
            </div>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>[]</span>
              <div className={styles["value-title"]}>Type everything</div>
              <div className={styles["value-body"]}>Untyped interfaces are a lie. We type our I/O contracts, our API responses, our internal state. If it can fail at runtime because of a bad type, it should fail at definition time instead.</div>
            </div>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>0x</span>
              <div className={styles["value-title"]}>Defaults that work</div>
              <div className={styles["value-body"]}>The default behavior should be correct for 80% of use cases. Configuration exists for the other 20%. We never make the user configure their way to a working system.</div>
            </div>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>↺</span>
              <div className={styles["value-title"]}>Failures are first-class</div>
              <div className={styles["value-body"]}>Things fail. LLMs return garbage. APIs rate-limit. Networks drop. We design for failure as a normal operating condition, not an edge case. Retry logic isn&apos;t an afterthought.</div>
            </div>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>∅</span>
              <div className={styles["value-title"]}>No magic</div>
              <div className={styles["value-body"]}>Frameworks that hide what they&apos;re doing create debugging nightmares. n00dles is readable. You can trace exactly what every call does, where every token goes, and why every decision was made.</div>
            </div>
            <div className={styles["value-cell"]}>
              <span className={styles["value-glyph"]}>🍜</span>
              <div className={styles["value-title"]}>Take the work seriously</div>
              <div className={styles["value-body"]}>We named our company after a noodle dish. We take the puns seriously too. Life&apos;s too short for soulless dev tools. Good work and good humor aren&apos;t mutually exclusive.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles["team-section"]}>
        <div className={styles.container}>
          <div className={styles["team-intro"]} data-reveal>
            <div className={styles["section-eyebrow"]} style={{ justifyContent: "flex-start" }}>The team</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Meet the noodles.
            </h2>
            <p>We&apos;re engineers, designers, and devrel humans distributed across 9 countries and every timezone that has decent ramen. Click any card to learn more. Hover to see their noodle type — yes, we assigned everyone one.</p>
          </div>

          <div className={styles["dept-filter"]} role="group" aria-label="Filter team by department" data-reveal data-delay="1">
            {DEPT_FILTERS.map((f) => (
              <button
                key={f.id}
                className={`${styles["dept-btn"]}${activeDept === f.id ? ` ${styles.active}` : ""}`}
                onClick={() => setActiveDept(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles["team-grid"]} role="list">
            {TEAM.map((member, i) => {
              const isHidden = activeDept !== "all" && member.dept !== activeDept;
              return (
                <div
                  key={member.name}
                  className={`${styles["member-card"]}${isHidden ? ` ${styles.hidden}` : ""}`}
                  role="listitem"
                  onClick={() => setSelectedMember(member)}
                  data-reveal
                  data-delay={String((i % 3) + 1)}
                >
                  <div className={styles["noodle-type"]}>{member.noodleType}</div>
                  <div className={styles["avatar-bowl"]}>
                    <div className={styles["avatar-initials"]}>{member.initials}</div>
                    <div className={styles["avatar-noodle"]}>{member.emoji}</div>
                  </div>
                  <div className={styles["member-dept"]}>{member.deptLabel}</div>
                  <div className={styles["member-name"]}>{member.name}</div>
                  <div className={styles["member-role"]}>{member.role}</div>
                  <div className={styles["member-handle"]}>{member.email}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOIN THE BOWL */}
      <section className={styles["jobs-section"]}>
        <div className={styles.container}>
          <div data-reveal>
            <div className={styles["section-eyebrow"]} style={{ justifyContent: "flex-start" }}>We&apos;re hiring</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Join the bowl.
            </h2>
            <p style={{ color: "var(--ts)", marginTop: 12, maxWidth: 520, fontSize: 15, lineHeight: 1.7 }}>
              We&apos;re a fully remote team that cares deeply about what we build and how we build it. Pick your noodle type on day one. That part is mandatory.
            </p>
          </div>
          <div className={styles["jobs-grid"]} role="list" data-reveal data-delay="1">
            {JOBS.map((job) => (
              <div key={job.title} className={styles["job-row"]} role="listitem">
                <div className={styles["job-info"]}>
                  <div className={styles["job-title"]}>{job.title}</div>
                  <div className={styles["job-meta"]}>
                    {job.tags.map((tag) => (
                      <span key={tag} className={styles["job-tag"]}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className={styles["job-arrow"]}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section className={styles["oss-section"]}>
        <div className={styles.container}>
          <div className={styles["oss-inner"]}>
            <div className={styles["oss-text"]} data-reveal>
              <div className={styles["hero-eyebrow"]} style={{ marginBottom: 20 }}>Open source</div>
              <h2>
                Built in public.
                <br />
                Maintained forever.
              </h2>
              <p>
                n00dles is MIT-licensed and developed entirely in the open on GitHub. Every bug
                fix, every feature, every decision — it&apos;s all there. We accept PRs, we
                respond to issues, and we don&apos;t have a separate &quot;enterprise-only&quot;
                fork.
              </p>
              <p>
                We believe the multi-agent orchestration layer should be a public good. The cloud
                platform is how we fund the open-source work — not the other way around.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <a href="https://github.com/n00dlehouse" className={styles["btn-primary"]} style={{ fontSize: 13, padding: "10px 20px" }}>
                  ★ Star on GitHub
                </a>
                <a href="https://discord.gg/n00dles" className={styles["btn-ghost"]} style={{ fontSize: 13, padding: "10px 20px" }}>
                  Join Discord
                </a>
              </div>
            </div>
            <div className={styles["oss-stats"]} data-reveal data-delay="2">
              <div className={styles["oss-stat"]}>
                <div className={styles["oss-stat-num"]}>2.4k</div>
                <div className={styles["oss-stat-lbl"]}>GitHub stars</div>
              </div>
              <div className={styles["oss-stat"]}>
                <div className={styles["oss-stat-num"]}>38</div>
                <div className={styles["oss-stat-lbl"]}>contributors</div>
              </div>
              <div className={styles["oss-stat"]}>
                <div className={styles["oss-stat-num"]}>MIT</div>
                <div className={styles["oss-stat-lbl"]}>license</div>
              </div>
              <div className={styles["oss-stat"]}>
                <div className={styles["oss-stat-num"]}>0</div>
                <div className={styles["oss-stat-lbl"]}>enterprise forks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles["about-cta"]}>
        <div className={styles.container}>
          <div className={styles["cta-inner"]} data-reveal>
            <div className={styles["section-eyebrow"]}>Join us</div>
            <h2 className={styles["cta-title"]}>Ship something you&apos;re proud of.</h2>
            <p className={styles["cta-sub"]}>Start building for free, contribute to the project, or come work with us.</p>
            <div className={styles["cta-actions"]}>
              <Link href="/quickstart" className={styles["btn-primary"]}>Get started →</Link>
              <a href="https://github.com/n00dlehouse" className={styles["btn-ghost"]}>Contribute on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.container}>
          <div className={styles["footer-grid"]}>
            <div className={styles["footer-brand"]}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 20, fontWeight: 700 }}>
                n<span className={styles.accent}>00</span>dles
              </div>
              <p>Open-source multi-agent AI orchestration. Built by engineers who got tired of spaghetti pipelines.</p>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Product</h5>
              <ul>
                <li><Link href="/#features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/blog">Changelog</Link></li>
              </ul>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Developers</h5>
              <ul>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/quickstart">Quickstart</Link></li>
                <li><a href="https://github.com/n00dlehouse">GitHub</a></li>
              </ul>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><a href="https://discord.gg/n00dles">Discord</a></li>
                <li><a href="mailto:hello@n00dles.com">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className={styles["footer-bottom"]}>
            <span>© 2026 n00dles. MIT License. Built with 🍜</span>
            <span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>v0.3.0-beta</span>
          </div>
        </div>
      </footer>

      {/* TEAM MEMBER MODAL */}
      {selectedMember && (
        <div
          className={`${styles["modal-overlay"]} ${styles.open}`}
          role="dialog"
          aria-modal="true"
          aria-label={selectedMember.name}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMember(null);
          }}
        >
          <div className={styles.modal}>
            <button className={styles["modal-close"]} onClick={() => setSelectedMember(null)} aria-label="Close">✕</button>
            <div className={styles["modal-avatar"]}>{selectedMember.emoji}</div>
            <div className={styles["modal-name"]}>{selectedMember.name}</div>
            <div className={styles["modal-role"]}>{selectedMember.role}</div>
            <div className={styles["modal-noodle-type"]}>noodle type: {selectedMember.noodleType}</div>
            <div className={styles["modal-bio"]}>
              {selectedMember.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className={styles["modal-tags"]}>
              {selectedMember.tags.map((tag) => (
                <span key={tag} className={styles["modal-tag"]}>{tag}</span>
              ))}
            </div>
            <div className={styles["modal-footer"]}>
              <a className={styles["modal-btn"]} href={`mailto:${selectedMember.email}`}>✉ {selectedMember.email}</a>
              <a
                className={`${styles["modal-btn"]} ${styles.primary}`}
                href={`https://twitter.com/${selectedMember.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ {selectedMember.twitter}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
