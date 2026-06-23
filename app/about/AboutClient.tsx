"use client";

import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import styles from "./page.module.css";

export function AboutClient() {
  useReveal();

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
                <strong>we built it ourselves.</strong> First as an internal library, then as an
                open-source project, then as the thing you&apos;re reading about right now.
              </p>
              <p>
                n00dles is our answer to the question &quot;what would a multi-agent framework
                look like if it was designed for production from day one, by people who&apos;ve
                had their pipelines wake them up at 2am?&quot;
              </p>
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

      {/* VALUES */}
      <section className={styles["values-section"]}>
        <div className={styles.container}>
          <div style={{ textAlign: "center" }} data-reveal>
            <div className={styles["section-eyebrow"]}>What we believe</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Three things we don&apos;t compromise on.
            </h2>
          </div>
          <div className={styles["values-grid"]}>
            <div className={styles["value-card"]} data-reveal data-delay="1">
              <div className={styles["value-icon"]}>⚙</div>
              <div className={styles["value-title"]}>Engineer-first</div>
              <div className={styles["value-body"]}>
                We write documentation for the person debugging at 2am with a broken pipeline —
                not for VPs in boardrooms. Every API decision starts with: &quot;would I want to
                use this at 3,000 lines of code?&quot; If the answer is no, we cut it.
              </div>
            </div>
            <div className={styles["value-card"]} data-reveal data-delay="2">
              <div className={styles["value-icon"]}>⛓</div>
              <div className={styles["value-title"]}>Open by default</div>
              <div className={styles["value-body"]}>
                The core framework is free, MIT-licensed, and will never have features
                paywalled. We believe the infrastructure layer of AI pipelines should be a public
                good. We make money on managed cloud hosting, not on restricting access to the
                tools.
              </div>
            </div>
            <div className={styles["value-card"]} data-reveal data-delay="3">
              <div className={styles["value-icon"]}>🛡️</div>
              <div className={styles["value-title"]}>Production-grade or nothing</div>
              <div className={styles["value-body"]}>
                We don&apos;t ship features that work in demos but fail under real load.
                Everything we build goes through our own production systems first. If we
                wouldn&apos;t trust it with a client&apos;s pipeline, we don&apos;t release it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles["team-section"]}>
        <div className={styles.container}>
          <div style={{ textAlign: "center" }} data-reveal>
            <div className={styles["section-eyebrow"]}>The team</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>
              Five engineers who got tired of the alternative.
            </h2>
          </div>
          <div className={styles["team-grid"]}>
            <div className={styles["team-card"]} data-reveal data-delay="1">
              <div className={styles["team-avatar"]}>ZO</div>
              <div className={styles["team-name"]}>Zara Okonkwo</div>
              <div className={styles["team-role"]}>Co-founder, CEO</div>
              <div className={styles["team-handle"]}>@zara_noodles</div>
            </div>
            <div className={styles["team-card"]} data-reveal data-delay="2">
              <div className={styles["team-avatar"]}>RT</div>
              <div className={styles["team-name"]}>Ryo Tanaka</div>
              <div className={styles["team-role"]}>Co-founder, CTO</div>
              <div className={styles["team-handle"]}>@ryo_noodles</div>
            </div>
            <div className={styles["team-card"]} data-reveal data-delay="3">
              <div className={styles["team-avatar"]}>LM</div>
              <div className={styles["team-name"]}>Leo Marchetti</div>
              <div className={styles["team-role"]}>Head of Engineering</div>
              <div className={styles["team-handle"]}>@leo_noodles</div>
            </div>
            <div className={styles["team-card"]} data-reveal data-delay="4">
              <div className={styles["team-avatar"]}>PS</div>
              <div className={styles["team-name"]}>Priya Sharma</div>
              <div className={styles["team-role"]}>Developer Relations</div>
              <div className={styles["team-handle"]}>@priya_noodles</div>
            </div>
            <div className={styles["team-card"]} data-reveal data-delay="5">
              <div className={styles["team-avatar"]}>FM</div>
              <div className={styles["team-name"]}>Finn McCarthy</div>
              <div className={styles["team-role"]}>Design</div>
              <div className={styles["team-handle"]}>@finn_noodles</div>
            </div>
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
                <a href="https://github.com/n00dles/n00dles" className={styles["btn-primary"]} style={{ fontSize: 13, padding: "10px 20px" }}>
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
              <a href="https://github.com/n00dles/n00dles" className={styles["btn-ghost"]}>Contribute on GitHub</a>
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
                <li><a href="https://github.com/n00dles/n00dles">GitHub</a></li>
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
            <span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>v0.1.0-beta</span>
          </div>
        </div>
      </footer>
    </>
  );
}
