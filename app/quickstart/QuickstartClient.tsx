"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useCopy } from "@/lib/useCopy";
import styles from "./page.module.css";

const TOTAL_STEPS = 6;

export function QuickstartClient() {
  const [activeStep, setActiveStep] = useState(1);
  const [copied0, copy0] = useCopy();
  const [copied1, copy1] = useCopy();
  const [copied2, copy2] = useCopy();

  const nextStep = () => setActiveStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));

  const stepClass = (n: number) => {
    if (n < activeStep) return `${styles.step} ${styles.done}`;
    if (n === activeStep) return `${styles.step} ${styles.active}`;
    return styles.step;
  };
  const progClass = (n: number) => {
    if (n < activeStep) return `${styles["prog-step"]} ${styles.done}`;
    if (n === activeStep) return `${styles["prog-step"]} ${styles.active}`;
    return styles["prog-step"];
  };
  const lineClass = (n: number) =>
    n < activeStep ? `${styles["prog-line"]} ${styles.done}` : styles["prog-line"];

  return (
    <>
      <MarketingNav />

      <div className={styles["qs-wrap"]}>
        <div className={styles["qs-hero"]}>
          <div className={styles["qs-eyebrow"]}>Quick Start</div>
          <h1 className={styles["qs-title"]}>
            First pipeline in
            <br />
            <span style={{ color: "var(--yellow)" }}>under 5 minutes.</span>
          </h1>
          <p className={styles["qs-lead"]}>
            You&apos;ll install n00dles, define three agents, chain them into a pipeline, and run
            it. No YAML, no classes, no configuration files.
          </p>
        </div>

        {/* PROGRESS TRACKER */}
        <div className={styles["progress-track"]} aria-hidden="true">
          <div className={progClass(1)}><div className={styles["prog-circle"]}>1</div><div className={styles["prog-label"]}>Install</div></div>
          <div className={lineClass(1)} />
          <div className={progClass(2)}><div className={styles["prog-circle"]}>2</div><div className={styles["prog-label"]}>API key</div></div>
          <div className={lineClass(2)} />
          <div className={progClass(3)}><div className={styles["prog-circle"]}>3</div><div className={styles["prog-label"]}>Agent</div></div>
          <div className={lineClass(3)} />
          <div className={progClass(4)}><div className={styles["prog-circle"]}>4</div><div className={styles["prog-label"]}>Pipeline</div></div>
          <div className={lineClass(4)} />
          <div className={progClass(5)}><div className={styles["prog-circle"]}>5</div><div className={styles["prog-label"]}>Run</div></div>
          <div className={lineClass(5)} />
          <div className={progClass(6)}><div className={styles["prog-circle"]}>6</div><div className={styles["prog-label"]}>Deploy</div></div>
        </div>

        {/* STEPS */}
        <div className={styles.steps}>
          <div className={stepClass(1)} id="step-1">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>1</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Install n00dles</div>
              <div className={styles["step-desc"]}>Run this in your terminal. Requires Python 3.10+.</div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}>
                  <span className={styles["code-lang"]}>bash</span>
                  <button
                    className={`${styles["code-copy"]}${copied0 ? ` ${styles.copied}` : ""}`}
                    onClick={() => copy0("pip install get-n00dles")}
                  >
                    {copied0 ? "copied!" : "copy"}
                  </button>
                </div>
                <pre>pip install get-n00dles</pre>
              </div>
              <button className={styles["step-continue"]} onClick={nextStep}>Installed ✓ — Continue →</button>
            </div>
          </div>

          <div className={stepClass(2)} id="step-2">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>2</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Set your API key</div>
              <div className={styles["step-desc"]}>
                n00dles reads credentials from environment variables. Add this to your shell
                profile or <code className={styles.code}>.env</code>{" "}file.
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}>
                  <span className={styles["code-lang"]}>bash</span>
                  <button
                    className={`${styles["code-copy"]}${copied1 ? ` ${styles.copied}` : ""}`}
                    onClick={() => copy1('export ANTHROPIC_API_KEY="sk-ant-api03-..."')}
                  >
                    {copied1 ? "copied!" : "copy"}
                  </button>
                </div>
                <pre><span className={styles.cm}># Anthropic (recommended)</span>{"\n"}export ANTHROPIC_API_KEY=&quot;sk-ant-api03-...&quot;{"\n\n"}<span className={styles.cm}># Or OpenAI</span>{"\n"}export OPENAI_API_KEY=&quot;sk-proj-...&quot;</pre>
              </div>
              <div className={`${styles.callout} ${styles.info}`}>
                <span className={styles["callout-icon"]}>ℹ</span>
                <div>Don&apos;t have a key? Get one at <a href="https://console.anthropic.com" style={{ color: "var(--yellow)" }}>console.anthropic.com</a> — Haiku is fast and cheap for testing.</div>
              </div>
              <button className={styles["step-continue"]} onClick={nextStep}>Key is set ✓ — Continue →</button>
            </div>
          </div>

          <div className={stepClass(3)} id="step-3">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>3</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Define your first agent</div>
              <div className={styles["step-desc"]}>
                Create <code className={styles.code}>pipeline.py</code>. An agent is just a
                decorated function — the docstring becomes the prompt.
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — pipeline.py</span></div>
                <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.cm}># One decorator. That&apos;s the whole API.</span>{"\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the given topic. Return 3 key facts as bullet points.&quot;&quot;&quot;</span></pre>
              </div>
              <button className={styles["step-continue"]} onClick={nextStep}>Added ✓ — Continue →</button>
            </div>
          </div>

          <div className={stepClass(4)} id="step-4">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>4</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Chain agents into a pipeline</div>
              <div className={styles["step-desc"]}>
                Add two more agents and wire them with <code className={styles.code}>&gt;&gt;</code>.
                n00dles passes the output of each agent as input to the next.
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — pipeline.py (continued)</span></div>
                <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a 200-word article based on the research.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>editor</span>(draft: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Polish the draft. Fix any awkward phrasing.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># &gt;&gt; chains output → input sequentially</span>{"\n"}content_pipeline <span className={styles.op}>=</span> pipeline({"\n"}    researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>3</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>60</span>{"\n"})</pre>
              </div>
              <button className={styles["step-continue"]} onClick={nextStep}>Added ✓ — Continue →</button>
            </div>
          </div>

          <div className={stepClass(5)} id="step-5">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>5</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Run it</div>
              <div className={styles["step-desc"]}>
                Add <code className={styles.code}>run()</code>{" "}
                and execute your file. n00dles will call each agent in sequence, retrying on
                failures.
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — pipeline.py (final)</span></div>
                <pre><span className={styles.cm}># One line to run the whole pipeline</span>{"\n"}result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;The future of multi-agent AI&quot;</span>){"\n"}<span className={styles.fn}>print</span>(result.output){"\n"}<span className={styles.fn}>print</span>(<span className={styles.str}>f&quot;Ran in &#123;result.duration_ms&#125;ms — &#123;result.total_tokens&#125; tokens&quot;</span>)</pre>
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}>
                  <span className={styles["code-lang"]}>bash</span>
                  <button
                    className={`${styles["code-copy"]}${copied2 ? ` ${styles.copied}` : ""}`}
                    onClick={() => copy2("python pipeline.py")}
                  >
                    {copied2 ? "copied!" : "copy"}
                  </button>
                </div>
                <pre>python pipeline.py</pre>
              </div>
              <div className={`${styles.callout} ${styles.tip}`}>
                <span className={styles["callout-icon"]}>✓</span>
                <div>You should see your article in the terminal within a few seconds. Each agent&apos;s trace is printed automatically.</div>
              </div>
              <button className={styles["step-continue"]} onClick={nextStep}>It ran! ✓ — Continue →</button>
            </div>
          </div>

          <div className={stepClass(6)} id="step-6">
            <div className={styles["step-num-wrap"]}><div className={styles["step-circle"]}>6</div></div>
            <div className={styles["step-body"]}>
              <div className={styles["step-title"]}>Deploy to production</div>
              <div className={styles["step-desc"]}>
                When you&apos;re ready to ship, <code className={styles.code}>noodles deploy</code>{" "}
                wraps your pipeline as a serverless function and gives you a live endpoint.
              </div>
              <div className={styles["code-block"]}>
                <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
                <pre>noodles deploy pipeline.py --name content-pipeline{"\n"}<span className={styles.cm}># → Deployed to https://run.n00dles.io/your-org/content-pipeline</span>{"\n"}<span className={styles.cm}># → POST requests trigger your pipeline</span>{"\n"}<span className={styles.cm}># → Logs and traces in your dashboard</span></pre>
              </div>
              <div className={`${styles.callout} ${styles.info}`}>
                <span className={styles["callout-icon"]}>ℹ</span>
                <div>
                  Need a <code className={styles.code}>noodles</code> account?{" "}
                  <Link href="/login" style={{ color: "var(--yellow)" }}>Sign up free</Link> — no credit card required.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUCCESS */}
        <div className={`${styles["success-wrap"]}${activeStep > TOTAL_STEPS ? "" : ` ${styles["hidden-success"]}`}`}>
          <div className={styles["success-banner"]}>
            <div className={styles["success-icon"]}>🍜</div>
            <div className={styles["success-title"]}>You&apos;ve shipped your first pipeline.</div>
            <div className={styles["success-sub"]}>Now go further — parallel execution, branching, Pydantic outputs, or deploy to production.</div>
            <div className={styles["next-cards"]}>
              <Link href="/docs" className={styles["next-card"]}>
                <div className={styles["next-card-label"]}>Core Concepts</div>
                <div className={styles["next-card-title"]}>Agents →</div>
              </Link>
              <Link href="/docs" className={styles["next-card"]}>
                <div className={styles["next-card-label"]}>API Reference</div>
                <div className={styles["next-card-title"]}>parallel() →</div>
              </Link>
              <Link href="/pricing" className={styles["next-card"]}>
                <div className={styles["next-card-label"]}>Scale</div>
                <div className={styles["next-card-title"]}>Deploy to cloud →</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles["footer-bottom"]}>
          <span>© 2026 n00dles. MIT License.</span>
          <Link href="/docs" style={{ color: "var(--ts)", fontSize: 13 }}>Full docs →</Link>
        </div>
      </footer>
    </>
  );
}
