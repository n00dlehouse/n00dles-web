"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type NavId = "pipelines" | "runs" | "logs" | "deploy" | "settings";

const SECTION_NAMES: Record<NavId, string> = {
  pipelines: "Pipelines",
  runs: "Runs",
  logs: "Logs",
  deploy: "Deploy",
  settings: "Settings",
};

export function DashboardClient() {
  const [activeNav, setActiveNav] = useState<NavId>("pipelines");
  const isPipelines = activeNav === "pipelines";

  const navClass = (id: NavId) => `${styles["sb-nav-link"]}${activeNav === id ? ` ${styles.active}` : ""}`;

  const newPipeline = () =>
    alert("noodles deploy pipeline.py\n\nRun this in your terminal to deploy a pipeline to your dashboard.");

  return (
    <div className={styles.page}>
      <div className={styles["dash-wrap"]}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar} role="navigation" aria-label="Dashboard navigation">
          <div className={styles["sb-logo"]}>
            <Link href="/" className={styles["sb-logo-text"]}>n<span style={{ color: "var(--yellow)" }}>00</span>dles</Link>
          </div>
          <div className={styles["sb-org"]}>
            <div className={styles["sb-org-av"]}>Z</div>
            <span className={styles["sb-org-name"]}>zara-okonkwo</span>
            <span className={styles["sb-org-arrow"]}>⌄</span>
          </div>

          <div className={styles["sb-section-label"]}>Workspace</div>
          <ul className={styles["sb-nav"]}>
            <li className={styles["sb-nav-item"]}>
              <span className={navClass("pipelines")} onClick={() => setActiveNav("pipelines")}>
                <span className={styles["sb-nav-icon"]}>⛓</span>Pipelines
                <span className={styles["sb-nav-badge"]}>5</span>
              </span>
            </li>
            <li className={styles["sb-nav-item"]}>
              <span className={navClass("runs")} onClick={() => setActiveNav("runs")}>
                <span className={styles["sb-nav-icon"]}>▷</span>Runs
                <span className={`${styles["sb-nav-badge"]} ${styles.err}`}>1</span>
              </span>
            </li>
            <li className={styles["sb-nav-item"]}>
              <span className={navClass("logs")} onClick={() => setActiveNav("logs")}>
                <span className={styles["sb-nav-icon"]}>📋</span>Logs
              </span>
            </li>
            <li className={styles["sb-nav-item"]}>
              <span className={navClass("deploy")} onClick={() => setActiveNav("deploy")}>
                <span className={styles["sb-nav-icon"]}>🚀</span>Deploy
              </span>
            </li>
          </ul>

          <div className={styles["sb-section-label"]} style={{ marginTop: 8 }}>Config</div>
          <ul className={styles["sb-nav"]}>
            <li className={styles["sb-nav-item"]}>
              <span className={navClass("settings")} onClick={() => setActiveNav("settings")}>
                <span className={styles["sb-nav-icon"]}>⚙</span>Settings
              </span>
            </li>
            <li className={styles["sb-nav-item"]}>
              <Link className={styles["sb-nav-link"]} href="/docs">
                <span className={styles["sb-nav-icon"]}>📖</span>Docs
              </Link>
            </li>
          </ul>

          <div className={styles["sb-bottom"]}>
            <div className={styles["sb-user"]}>
              <div className={styles["sb-user-av"]}>Z</div>
              <div className={styles["sb-user-info"]}>
                <div className={styles["sb-user-name"]}>Zara Okonkwo</div>
                <div className={styles["sb-user-plan"]}>Free plan</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className={styles["dash-main"]}>
          {/* TOPBAR */}
          <div className={styles.topbar}>
            <div className={styles["topbar-breadcrumb"]}>n00dles <span style={{ color: "var(--border-mid)" }}>/</span> <span>{SECTION_NAMES[activeNav]}</span></div>
            <div className={styles["topbar-right"]}>
              <button className={`${styles["tb-btn"]} ${styles.ghost}`}>⌕ Search</button>
              <button className={`${styles["tb-btn"]} ${styles.primary}`} onClick={newPipeline}>+ New pipeline</button>
            </div>
          </div>

          {/* PIPELINES VIEW */}
          <div className={isPipelines ? "" : styles["hidden-view"]}>
            <div className={styles["dash-content"]}>
              {/* QUICK START */}
              <div className={styles["quick-start"]}>
                <div className={styles["qs-text"]}>
                  <h3>Your pipelines live here.</h3>
                  <p>Deploy a pipeline from your local machine with <code style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--yellow)", background: "var(--ydim)", border: "1px solid var(--border)", padding: "1px 5px", borderRadius: 3 }}>noodles deploy pipeline.py</code></p>
                </div>
                <div className={styles["qs-actions"]}>
                  <Link href="/quickstart" className={`${styles["tb-btn"]} ${styles.ghost}`}>Read quickstart</Link>
                  <button className={`${styles["tb-btn"]} ${styles.primary}`}>Deploy first pipeline</button>
                </div>
              </div>

              {/* STATS ROW */}
              <div className={styles["stats-row"]}>
                <div className={styles["stat-card"]}>
                  <div className={styles["stat-header"]}>
                    <div className={styles["stat-label"]}>Total runs</div>
                    <div className={`${styles["stat-trend"]} ${styles.up}`}>↑ 12%</div>
                  </div>
                  <div className={styles["stat-value"]}>4,231</div>
                  <div className={styles["stat-sub"]}>this month</div>
                </div>
                <div className={styles["stat-card"]}>
                  <div className={styles["stat-header"]}>
                    <div className={styles["stat-label"]}>Success rate</div>
                    <div className={`${styles["stat-trend"]} ${styles.up}`}>↑ 0.4%</div>
                  </div>
                  <div className={styles["stat-value"]} style={{ color: "var(--green)" }}>97.3%</div>
                  <div className={styles["stat-sub"]}>last 30 days</div>
                </div>
                <div className={styles["stat-card"]}>
                  <div className={styles["stat-header"]}>
                    <div className={styles["stat-label"]}>Avg latency</div>
                    <div className={`${styles["stat-trend"]} ${styles.down}`}>↓ 8%</div>
                  </div>
                  <div className={styles["stat-value"]}>843ms</div>
                  <div className={styles["stat-sub"]}>p50, all pipelines</div>
                </div>
                <div className={styles["stat-card"]}>
                  <div className={styles["stat-header"]}>
                    <div className={styles["stat-label"]}>Est. LLM cost</div>
                    <div className={`${styles["stat-trend"]} ${styles.up}`}>↑ $2.1</div>
                  </div>
                  <div className={styles["stat-value"]}>$12.40</div>
                  <div className={styles["stat-sub"]}>this month so far</div>
                </div>
              </div>

              {/* PIPELINES TABLE */}
              <div>
                <div className={styles["section-hd"]}>
                  <div className={styles["section-title"]}>Pipelines</div>
                  <span className={styles["section-action"]} onClick={newPipeline}>+ New pipeline</span>
                </div>
                <div className={styles["pipelines-card"]}>
                  <table className={styles["pipe-table"]}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Last run</th>
                        <th>Runs (7d)</th>
                        <th>Success</th>
                        <th>P50</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className={styles["pipe-name"]}>content-pipeline</div></td>
                        <td><div className={`${styles["pipe-status"]} ${styles.healthy}`}><div className={`${styles["status-dot"]} ${styles.healthy}`} />healthy</div></td>
                        <td>2 min ago</td>
                        <td>238</td>
                        <td style={{ color: "var(--green)", fontFamily: "var(--fm)", fontSize: 12 }}>99.2%</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12 }}>720ms</td>
                        <td><div className={styles["pipe-actions"]}><button className={styles["pipe-action-btn"]}>Logs</button><button className={styles["pipe-action-btn"]}>Run</button></div></td>
                      </tr>
                      <tr>
                        <td><div className={styles["pipe-name"]}>research-bot</div></td>
                        <td><div className={`${styles["pipe-status"]} ${styles.running}`}><div className={`${styles["status-dot"]} ${styles.running}`} />running</div></td>
                        <td>now</td>
                        <td>91</td>
                        <td style={{ color: "var(--green)", fontFamily: "var(--fm)", fontSize: 12 }}>96.7%</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12 }}>2.1s</td>
                        <td><div className={styles["pipe-actions"]}><button className={styles["pipe-action-btn"]}>Logs</button><button className={styles["pipe-action-btn"]}>Stop</button></div></td>
                      </tr>
                      <tr>
                        <td><div className={styles["pipe-name"]}>customer-triage</div></td>
                        <td><div className={`${styles["pipe-status"]} ${styles.error}`}><div className={`${styles["status-dot"]} ${styles.error}`} />error</div></td>
                        <td>18 min ago</td>
                        <td>412</td>
                        <td style={{ color: "var(--red)", fontFamily: "var(--fm)", fontSize: 12 }}>91.4%</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12 }}>440ms</td>
                        <td><div className={styles["pipe-actions"]}><button className={styles["pipe-action-btn"]} style={{ color: "var(--red)", borderColor: "rgba(226,75,74,.3)" }}>Error</button><button className={styles["pipe-action-btn"]}>Retry</button></div></td>
                      </tr>
                      <tr>
                        <td><div className={styles["pipe-name"]}>doc-processor</div></td>
                        <td><div className={`${styles["pipe-status"]} ${styles.healthy}`}><div className={`${styles["status-dot"]} ${styles.healthy}`} />healthy</div></td>
                        <td>1h ago</td>
                        <td>1,044</td>
                        <td style={{ color: "var(--green)", fontFamily: "var(--fm)", fontSize: 12 }}>99.8%</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12 }}>610ms</td>
                        <td><div className={styles["pipe-actions"]}><button className={styles["pipe-action-btn"]}>Logs</button><button className={styles["pipe-action-btn"]}>Run</button></div></td>
                      </tr>
                      <tr>
                        <td><div className={styles["pipe-name"]}>market-intel</div></td>
                        <td><div className={`${styles["pipe-status"]} ${styles.paused}`}><div className={`${styles["status-dot"]} ${styles.paused}`} />paused</div></td>
                        <td>3 days ago</td>
                        <td>0</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--tm)" }}>—</td>
                        <td style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--tm)" }}>—</td>
                        <td><div className={styles["pipe-actions"]}><button className={styles["pipe-action-btn"]}>Logs</button><button className={styles["pipe-action-btn"]}>Resume</button></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div className={styles["activity-grid"]}>
                {/* RECENT RUNS */}
                <div>
                  <div className={styles["section-hd"]}>
                    <div className={styles["section-title"]}>Recent runs</div>
                    <span className={styles["section-action"]}>View all →</span>
                  </div>
                  <div className={styles["activity-card"]}>
                    <div className={styles["run-feed"]}>
                      <div className={styles["run-item"]}>
                        <div className={`${styles["run-icon"]} ${styles.ok}`}>✓</div>
                        <div className={styles["run-info"]}>
                          <div className={styles["run-name"]}>content-pipeline / run #4231</div>
                          <div className={styles["run-meta"]}>2 min ago · 3 agents · gpt-4o</div>
                        </div>
                        <div className={styles["run-dur"]}>720ms</div>
                      </div>
                      <div className={styles["run-item"]}>
                        <div className={`${styles["run-icon"]} ${styles.run}`}>▷</div>
                        <div className={styles["run-info"]}>
                          <div className={styles["run-name"]}>research-bot / run #4230</div>
                          <div className={styles["run-meta"]}>now · 5 agents · claude-sonnet-4-6</div>
                        </div>
                        <div className={styles["run-dur"]} style={{ color: "var(--blue)" }}>running</div>
                      </div>
                      <div className={styles["run-item"]}>
                        <div className={`${styles["run-icon"]} ${styles.fail}`}>✗</div>
                        <div className={styles["run-info"]}>
                          <div className={styles["run-name"]}>customer-triage / run #4229</div>
                          <div className={styles["run-meta"]}>18 min ago · Timeout on classify agent</div>
                        </div>
                        <div className={styles["run-dur"]} style={{ color: "var(--red)" }}>failed</div>
                      </div>
                      <div className={styles["run-item"]}>
                        <div className={`${styles["run-icon"]} ${styles.ok}`}>✓</div>
                        <div className={styles["run-info"]}>
                          <div className={styles["run-name"]}>doc-processor / run #4228</div>
                          <div className={styles["run-meta"]}>1h ago · 2 agents · claude-haiku-4-5</div>
                        </div>
                        <div className={styles["run-dur"]}>610ms</div>
                      </div>
                      <div className={styles["run-item"]}>
                        <div className={`${styles["run-icon"]} ${styles.ok}`}>✓</div>
                        <div className={styles["run-info"]}>
                          <div className={styles["run-name"]}>doc-processor / run #4227</div>
                          <div className={styles["run-meta"]}>1h ago · 2 agents · claude-haiku-4-5</div>
                        </div>
                        <div className={styles["run-dur"]}>590ms</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* USAGE */}
                <div>
                  <div className={styles["section-hd"]}>
                    <div className={styles["section-title"]}>Usage this month</div>
                    <Link href="/pricing" className={styles["section-action"]}>Upgrade plan →</Link>
                  </div>
                  <div className={styles["activity-card"]} style={{ padding: 20 }}>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--tm)" }}>AGENT RUNS</div>
                        <div style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--ts)" }}>4,231 / ∞</div>
                      </div>
                      <div style={{ height: 6, background: "var(--bg-raised)", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 100, background: "var(--yellow)", width: "42%" }} />
                      </div>
                      <div style={{ fontSize: 12, color: "var(--tm)", marginTop: 4 }}>Self-hosted — no limits</div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <div style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--tm)" }}>EST. LLM TOKENS</div>
                        <div style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--ts)" }}>6.2M</div>
                      </div>
                      <div style={{ height: 6, background: "var(--bg-raised)", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 100, background: "var(--blue)", opacity: 0.6, width: "31%" }} />
                      </div>
                    </div>
                    <div style={{ background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: 14 }}>
                      <div style={{ fontFamily: "var(--fd)", fontSize: 13, fontWeight: 500, color: "var(--tp)", marginBottom: 4 }}>Upgrade to Pro</div>
                      <div style={{ fontSize: 12, color: "var(--ts)", marginBottom: 12 }}>Get managed cloud hosting, observability dashboard, and email support.</div>
                      <Link href="/pricing" className={`${styles["tb-btn"]} ${styles.primary}`} style={{ display: "inline-flex", fontSize: 12, padding: "6px 14px" }}>View plans →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PLACEHOLDER VIEWS */}
          <div className={!isPipelines ? "" : styles["hidden-view"]}>
            <div className={styles["dash-content"]}>
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontFamily: "var(--fm)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--tm)", marginBottom: 16 }}>{SECTION_NAMES[activeNav]}</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 600, color: "var(--tp)", marginBottom: 12 }}>Coming soon.</div>
                <div style={{ fontSize: 15, color: "var(--ts)", maxWidth: 380, margin: "0 auto 28px" }}>This section is in active development. <a href="https://discord.gg/n00dles" style={{ color: "var(--yellow)" }}>Join Discord</a> to get early access and share feedback.</div>
                <button className={`${styles["tb-btn"]} ${styles.ghost}`} onClick={() => setActiveNav("pipelines")}>← Back to Pipelines</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
