"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export function LoginClient() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const isSignin = tab === "signin";

  const redirectToDashboard = (delay: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, delay);
  };

  return (
    <div className={styles.page}>
    <div className={styles["auth-wrap"]}>
      {/* BRAND PANEL */}
      <div className={styles["auth-brand"]}>
        <div className={styles["brand-bg"]} aria-hidden="true" />
        <div className={styles["brand-glow"]} aria-hidden="true" />
        <div className={styles["brand-logo"]}>n<span style={{ color: "var(--yellow)" }}>00</span>dles</div>
        <div className={styles["brand-main"]}>
          <div className={styles["brand-headline"]}>
            Stop writing
            <br />
            pipeline glue code.
          </div>
          <div className={styles["brand-sub"]}>
            n00dles handles orchestration, state, retries, and observability — so you can focus
            on the agents that actually matter.
          </div>
          <div className={styles["brand-pipeline"]}>
            <div style={{ marginBottom: 4 }}><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>)</div>
            <div><span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>: ...</div>
            <div style={{ marginTop: 8 }}><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>)</div>
            <div><span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>: ...</div>
            <div style={{ marginTop: 8, color: "var(--ts)" }}>result <span className={styles.op}>=</span> run(researcher <span className={styles.op}>&gt;&gt;</span> writer)</div>
          </div>
        </div>
        <div className={styles["brand-social"]}>
          <div className={styles["social-item"]}>
            <div className={styles["social-av"]}>S</div>
            <div className={styles["social-text"]}><strong>Replaced 400 lines of LangChain</strong> with n00dles yesterday. Same behavior, 90% less code. This is what I wanted.</div>
          </div>
          <div className={styles["social-item"]}>
            <div className={styles["social-av"]}>M</div>
            <div className={styles["social-text"]}><strong>The retry handling alone</strong> is worth the switch. I haven&apos;t had a failed pipeline wake me up in 3 weeks.</div>
          </div>
        </div>
      </div>

      {/* FORM PANEL */}
      <div className={styles["auth-form-wrap"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-card-logo"]}>n<span style={{ color: "var(--yellow)" }}>00</span>dles</div>
          <div className={styles["auth-toggle"]}>
            <button
              className={`${styles["auth-toggle-btn"]}${isSignin ? ` ${styles.active}` : ""}`}
              onClick={() => setTab("signin")}
            >
              Sign in
            </button>
            <button
              className={`${styles["auth-toggle-btn"]}${!isSignin ? ` ${styles.active}` : ""}`}
              onClick={() => setTab("signup")}
            >
              Create account
            </button>
          </div>

          {/* SIGN IN */}
          <div className={`${styles["form-section"]}${isSignin ? ` ${styles.active}` : ""}`}>
            <div className={styles["auth-title"]}>Welcome back.</div>
            <div className={styles["auth-subtitle"]}>Sign in to your n00dles account.</div>
            <button className={styles["oauth-btn"]} onClick={() => redirectToDashboard(800)}>
              <svg className={styles["oauth-icon"]} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              Continue with GitHub
            </button>
            <button className={styles["oauth-btn"]}>
              <svg className={styles["oauth-icon"]} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Continue with Google
            </button>
            <div className={styles.divider}>or email</div>
            <div className={styles.field}>
              <label className={styles["field-label"]} htmlFor="signin-email">EMAIL</label>
              <input className={styles["field-input"]} id="signin-email" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className={styles.field}>
              <div className={styles["field-row"]}>
                <label className={styles["field-label"]} htmlFor="signin-pw" style={{ marginBottom: 0 }}>PASSWORD</label>
                <a className={styles["forgot-link"]} href="#">Forgot password?</a>
              </div>
              <input className={styles["field-input"]} id="signin-pw" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>
            <button
              className={`${styles["submit-btn"]}${loading ? ` ${styles.disabled}` : ""}`}
              onClick={() => redirectToDashboard(1200)}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <div className={styles["auth-switch"]}>No account? <a onClick={() => setTab("signup")}>Create one free →</a></div>
          </div>

          {/* SIGN UP */}
          <div className={`${styles["form-section"]}${!isSignin ? ` ${styles.active}` : ""}`}>
            <div className={styles["auth-title"]}>Start building.</div>
            <div className={styles["auth-subtitle"]}>Free account. No credit card required.</div>
            <button className={styles["oauth-btn"]} onClick={() => redirectToDashboard(800)}>
              <svg className={styles["oauth-icon"]} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              Sign up with GitHub
            </button>
            <div className={styles.divider}>or email</div>
            <div className={styles.field}>
              <label className={styles["field-label"]} htmlFor="signup-name">FULL NAME</label>
              <input className={styles["field-input"]} id="signup-name" type="text" placeholder="Ada Lovelace" autoComplete="name" />
            </div>
            <div className={styles.field}>
              <label className={styles["field-label"]} htmlFor="signup-email">WORK EMAIL</label>
              <input className={styles["field-input"]} id="signup-email" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className={styles.field}>
              <label className={styles["field-label"]} htmlFor="signup-pw">PASSWORD</label>
              <input className={styles["field-input"]} id="signup-pw" type="password" placeholder="at least 8 characters" autoComplete="new-password" />
            </div>
            <button
              className={`${styles["submit-btn"]}${loading ? ` ${styles.disabled}` : ""}`}
              onClick={() => redirectToDashboard(1400)}
            >
              {loading ? "Creating account…" : "Create free account"}
            </button>
            <div className={styles["terms-note"]}>By signing up you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</div>
            <div className={styles["auth-switch"]}>Already have an account? <a onClick={() => setTab("signin")}>Sign in →</a></div>
          </div>
        </div>
      </div>
    </div>

    <div className={styles["auth-footer"]}>
      <Link href="/">← Back to n00dles.io</Link>
      <div style={{ display: "flex", gap: 20 }}>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="https://discord.gg/n00dles">Help</a>
      </div>
    </div>
    </div>
  );
}
