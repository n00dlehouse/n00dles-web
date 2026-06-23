"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import styles from "./page.module.css";

export function PricingClient() {
  useReveal();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const proPrice = annual ? "23" : "29";
  const teamPrice = annual ? "79" : "99";
  const pricePeriod = annual ? "/mo · billed annually" : "/mo · billed monthly";

  const faqClass = (i: number) => `${styles["faq-item"]}${openFaq === i ? ` ${styles.open}` : ""}`;
  const toggleFaq = (i: number) => () => setOpenFaq((cur) => (cur === i ? null : i));

  return (
    <>
      <MarketingNav active="pricing" />

      {/* HERO */}
      <div className={styles["pricing-hero"]}>
        <div className={styles.container}>
          <div className={styles.eyebrow} data-reveal>Pricing</div>
          <h1 className={styles.h1} data-reveal>Simple, transparent pricing.</h1>
          <p data-reveal>Free to start. Pay when you scale. No surprises.</p>
          <div className={styles["toggle-wrap"]} data-reveal>
            <span className={`${styles["toggle-label"]}${!annual ? ` ${styles.active}` : ""}`}>Monthly</span>
            <button
              className={`${styles.toggle}${annual ? ` ${styles.annual}` : ""}`}
              onClick={() => setAnnual((a) => !a)}
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
            >
              <div className={styles["toggle-knob"]} />
            </button>
            <span className={`${styles["toggle-label"]}${annual ? ` ${styles.active}` : ""}`}>Annual</span>
            <span className={styles["save-badge"]}>Save 20%</span>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className={styles["pricing-section"]}>
        <div className={styles.container}>
          <div className={styles["pricing-grid"]}>
            {/* Free */}
            <div className={styles["plan-card"]} data-reveal data-delay="1">
              <div className={`${styles["plan-badge"]} ${styles.free}`}>Free</div>
              <div className={styles["plan-name"]}>Free</div>
              <div className={styles["plan-price"]}>
                <span className={styles["plan-price-curr"]}>$</span>
                <span className={styles["plan-price-num"]}>0</span>
              </div>
              <div className={styles["plan-price-period"]}>forever free</div>
              <div className={styles["plan-desc"]}>Self-hosted. All core features. For developers who want full control.</div>
              <Link href="/quickstart" className={`${styles["plan-cta"]} ${styles.secondary}`}>Get started →</Link>
              <div className={styles["plan-divider"]} />
              <ul className={styles["plan-features"]}>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Unlimited pipelines &amp; agents</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> All core orchestration features</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Self-hosted only</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Community support (Discord)</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> MIT license, forever</li>
                <li><span className={`${styles["pf-icon"]} ${styles.dim}`}>–</span> No managed cloud</li>
                <li><span className={`${styles["pf-icon"]} ${styles.dim}`}>–</span> No built-in observability SaaS</li>
              </ul>
            </div>

            {/* Pro */}
            <div className={styles["plan-card"]} data-reveal data-delay="2">
              <div className={`${styles["plan-badge"]} ${styles.pro}`}>Pro</div>
              <div className={styles["plan-name"]}>Pro</div>
              <div className={styles["plan-price"]}>
                <span className={styles["plan-price-curr"]}>$</span>
                <span className={styles["plan-price-num"]}>{proPrice}</span>
              </div>
              <div className={styles["plan-price-period"]}>{pricePeriod}</div>
              <div className={styles["plan-desc"]}>Managed cloud. For solo builders and small teams who want to focus on shipping.</div>
              <Link href="/login" className={`${styles["plan-cta"]} ${styles.secondary}`}>Start free trial →</Link>
              <div className={styles["plan-divider"]} />
              <ul className={styles["plan-features"]}>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Everything in Free</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Managed cloud hosting</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> 10,000 agent runs / month</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Hosted observability dashboard</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Email support</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Up to 3 team members</li>
                <li><span className={`${styles["pf-icon"]} ${styles.dim}`}>–</span> No SSO / SAML</li>
              </ul>
            </div>

            {/* Team (featured) */}
            <div className={`${styles["plan-card"]} ${styles.featured}`} data-reveal data-delay="3">
              <div className={`${styles["plan-badge"]} ${styles.team}`}>Team</div>
              <div className={styles["plan-name"]}>Team</div>
              <div className={styles["plan-price"]}>
                <span className={styles["plan-price-curr"]}>$</span>
                <span className={styles["plan-price-num"]}>{teamPrice}</span>
              </div>
              <div className={styles["plan-price-period"]}>{pricePeriod}</div>
              <div className={styles["plan-desc"]}>For growing engineering teams who run AI pipelines in production every day.</div>
              <Link href="/login" className={`${styles["plan-cta"]} ${styles.primary}`}>Start free trial →</Link>
              <div className={styles["plan-divider"]} />
              <ul className={styles["plan-features"]}>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Everything in Pro</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> 50,000 agent runs / month</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Unlimited team members</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Priority support + 99.9% SLA</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> SSO / SAML</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Audit logs</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Custom retention policies</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className={styles["plan-card"]} data-reveal data-delay="4">
              <div className={`${styles["plan-badge"]} ${styles.ent}`}>Enterprise</div>
              <div className={styles["plan-name"]}>Enterprise</div>
              <div className={styles["plan-price"]}>
                <span className={styles["plan-price-num"]} style={{ fontSize: 28, color: "var(--ts)" }}>Custom</span>
              </div>
              <div className={styles["plan-price-period"]}>contact for pricing</div>
              <div className={styles["plan-desc"]}>Dedicated infrastructure, on-prem, and a team behind you 24/7.</div>
              <a href="mailto:enterprise@n00dles.com" className={`${styles["plan-cta"]} ${styles.secondary}`}>Contact sales →</a>
              <div className={styles["plan-divider"]} />
              <ul className={styles["plan-features"]}>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Everything in Team</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Unlimited agent runs</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> On-prem / air-gapped deploy</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Dedicated infra &amp; VPC</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> 24/7 dedicated support</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Custom SLA</li>
                <li><span className={`${styles["pf-icon"]} ${styles.yes}`}>✓</span> Security review &amp; BAA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE TABLE */}
      <div className={styles["feat-table-section"]}>
        <div className={styles.container}>
          <div style={{ textAlign: "center" }} data-reveal>
            <div className={styles.eyebrow}>Full comparison</div>
            <h2 className={styles.h2} style={{ marginBottom: 8 }}>Everything, side by side.</h2>
          </div>
          <div style={{ overflowX: "auto" }} data-reveal>
            <table className={styles["feat-table"]}>
              <thead>
                <tr>
                  <th style={{ width: "36%" }}>Feature</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th className={styles.hl}>Team</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles["group-row"]}><td colSpan={5}>Core</td></tr>
                <tr><td>Pipelines &amp; agents</td><td><span className={styles.lim}>Unlimited</span></td><td><span className={styles.lim}>Unlimited</span></td><td className={styles.hl}><span className={styles.lim}>Unlimited</span></td><td><span className={styles.lim}>Unlimited</span></td></tr>
                <tr><td>Agent runs / month</td><td><span className={styles.lim}>Self-hosted</span></td><td><span className={styles.lim}>10,000</span></td><td className={styles.hl}><span className={styles.lim}>50,000</span></td><td><span className={styles.lim}>Custom</span></td></tr>
                <tr><td>Retry &amp; timeout handling</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Persistent state (Redis / SQLite)</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>All LLM providers</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr className={styles["group-row"]}><td colSpan={5}>Hosting &amp; Deploy</td></tr>
                <tr><td>Self-hosted</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Managed cloud (noodles.cloud)</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>On-prem / air-gapped</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span style={{ color: "var(--tm)" }}>—</span></td><td className={styles.hl}><span style={{ color: "var(--tm)" }}>—</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr className={styles["group-row"]}><td colSpan={5}>Observability</td></tr>
                <tr><td>Structured traces &amp; logs</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Hosted observability dashboard</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Audit logs</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span style={{ color: "var(--tm)" }}>—</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr className={styles["group-row"]}><td colSpan={5}>Team &amp; Security</td></tr>
                <tr><td>Team members</td><td><span className={styles.lim}>1</span></td><td><span className={styles.lim}>3</span></td><td className={styles.hl}><span className={styles.lim}>Unlimited</span></td><td><span className={styles.lim}>Unlimited</span></td></tr>
                <tr><td>SSO / SAML</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span style={{ color: "var(--tm)" }}>—</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>SLA</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span style={{ color: "var(--tm)" }}>—</span></td><td className={styles.hl}><span className={styles.lim}>99.9%</span></td><td><span className={styles.lim}>Custom</span></td></tr>
                <tr className={styles["group-row"]}><td colSpan={5}>Support</td></tr>
                <tr><td>Community (Discord)</td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Email support</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span className={styles.chk}>✓</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Priority + dedicated</td><td><span style={{ color: "var(--tm)" }}>—</span></td><td><span style={{ color: "var(--tm)" }}>—</span></td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className={styles["faq-section"]}>
        <div className={styles.container}>
          <div style={{ textAlign: "center" }} data-reveal>
            <div className={styles.eyebrow}>FAQ</div>
            <h2 className={styles.h2} style={{ marginBottom: 0 }}>Common questions.</h2>
          </div>
          <div className={styles["faq-grid"]} data-reveal>
            <div className={faqClass(0)} onClick={toggleFaq(0)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>Do you charge per token or per LLM call?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>No. n00dles charges per agent run — one run is one complete execution of an agent in a pipeline. Your LLM provider bills you separately for tokens. We don&apos;t touch your API costs.</div>
            </div>
            <div className={faqClass(1)} onClick={toggleFaq(1)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>Can I always self-host for free?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>Yes, always. The Free tier is the full open-source n00dles on your own infrastructure. MIT license, no feature restrictions, no usage limits. We make money on managed cloud, not on the core framework.</div>
            </div>
            <div className={faqClass(2)} onClick={toggleFaq(2)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>What happens if I exceed my run limit?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>Pipelines don&apos;t hard-fail. You&apos;ll get an email warning at 80% usage. At 100% you can continue at $0.002 per additional run, or upgrade. We don&apos;t silently degrade your agents.</div>
            </div>
            <div className={faqClass(3)} onClick={toggleFaq(3)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>Is there a free trial for paid plans?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>Yes — 14 days free on Pro and Team, no credit card required. If you need longer to evaluate for your team, email us and we&apos;ll extend it.</div>
            </div>
            <div className={faqClass(4)} onClick={toggleFaq(4)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>Can I upgrade or downgrade anytime?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>Yes. Upgrades take effect immediately. Downgrades take effect at the end of your billing cycle. Prorated credits are applied automatically.</div>
            </div>
            <div className={faqClass(5)} onClick={toggleFaq(5)}>
              <div className={styles["faq-q"]}>
                <span className={styles["faq-q-text"]}>Do you offer discounts for open-source projects?</span>
                <span className={styles["faq-chevron"]}>▾</span>
              </div>
              <div className={styles["faq-a"]}>Yes — open-source projects get Team plan at 80% off. Academic and non-profit organizations get 50% off. Reach out to hello@n00dles.com with a link to your project.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles["cta-section"]}>
        <div className={styles.container}>
          <div className={styles["cta-inner"]} data-reveal>
            <div className={styles.eyebrow}>Get started</div>
            <h2 className={styles["cta-title"]}>
              Start for free.
              <br />
              Scale when you&apos;re ready.
            </h2>
            <p className={styles["cta-sub"]}>No credit card. No vendor lock-in. Just agents that ship.</p>
            <div className={styles["cta-actions"]}>
              <Link href="/quickstart" className={styles["btn-primary"]}>Start building →</Link>
              <a href="mailto:enterprise@n00dles.com" className={styles["btn-ghost"]}>Talk to sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.container}>
          <div className={styles["footer-grid"]}>
            <div className={styles["footer-brand"]}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 20, fontWeight: 700 }}>n<span className={styles.accent}>00</span>dles</div>
              <p>Open-source multi-agent AI orchestration. Built by engineers who got tired of spaghetti pipelines.</p>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Product</h5>
              <ul>
                <li><Link href="/#features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/#compare">Compare</Link></li>
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
              </ul>
            </div>
          </div>
          <div className={styles["footer-bottom"]}>
            <span>© 2026 n00dles. MIT License.</span>
            <span className={styles.mono} style={{ fontSize: 12 }}>v0.1.0-beta</span>
          </div>
        </div>
      </footer>
    </>
  );
}
