"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/MarketingNav";
import { useReveal } from "@/lib/useReveal";
import { useCopy } from "@/lib/useCopy";
import styles from "./page.module.css";

export function HomeClient() {
  useReveal();
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, copy] = useCopy();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current && total > 0) {
        progressRef.current.style.width = (scrolled / total) * 100 + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tabBtn = (i: number) => `${styles["tab-btn"]}${activeTab === i ? ` ${styles.active}` : ""}`;
  const codePane = (i: number) =>
    `${styles["code-pane"]}${activeTab === i ? ` ${styles["active-pane"]}` : ""}`;

  return (
    <>
      <div ref={progressRef} className={styles["progress-bar"]} />
      <MarketingNav />

      {/* HERO */}
      <section id="hero" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles["hero-glow"]} aria-hidden="true" />
        <div className={styles["hero-grid"]} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles["hero-content"]}>
            <div className={styles["hero-badge"]}>
              <div className={styles["hero-badge-dot"]} aria-hidden="true" />
              v0.3.0 public beta — open source, MIT licensed
            </div>
            <h1 className={styles["hero-title"]} id="hero-title">
              <span className={styles.l1}>Your LLM pipelines</span>
              <span className={styles.l2}>are spaghetti.</span>
              <span className={styles.l3}>n<span className={styles.accent}>00</span>dles fixes that.</span>
            </h1>
            <p className={styles["hero-sub"]}>
              Open-source multi-agent AI orchestration built for engineers who ship. Chain
              agents, manage state, handle failures — without 800 lines of boilerplate.
            </p>
            <p className={styles["hero-tagline"]}>
              🍜 Noodles tangle into chains — that&apos;s your agent pipeline. Drop a few more in
              the bowl and they cook in parallel. The bowl itself? That&apos;s the runtime
              holding it all together.
            </p>
            <div className={styles["hero-actions"]}>
              <Link href="/quickstart" className={styles["btn-primary"]}>
                Get started →
              </Link>
              <a href="https://github.com/n00dlehouse" className={styles["btn-ghost"]}>
                View on GitHub
              </a>
            </div>
            <div className={styles["install-cmd"]} role="code" aria-label="Install command">
              <span className={styles["cmd-dollar"]}>$</span>
              <span className={styles["cmd-text"]}>pip install get-n00dles</span>
              <button
                className={`${styles["copy-btn-sm"]}${copied ? ` ${styles.copied}` : ""}`}
                onClick={() => copy("pip install get-n00dles")}
                aria-label="Copy install command"
              >
                {copied ? "copied!" : "copy"}
              </button>
            </div>
            <div className={styles["noodle-canvas"]} aria-hidden="true">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                  className={styles["noodle-path"]}
                  d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60"
                  stroke="#F5C842"
                  strokeWidth="2"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{ animationDelay: "0s", animationDuration: "1.2s,6s" }}
                />
                <path
                  className={styles["noodle-path"]}
                  d="M0,80 C200,40 400,110 600,75 C800,40 1000,105 1200,80"
                  stroke="rgba(245,200,66,.35)"
                  strokeWidth="1.5"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{ animationDelay: "0.3s", animationDuration: "1.4s,7s" }}
                />
                <path
                  className={styles["noodle-path"]}
                  d="M0,45 C100,75 250,15 450,50 C650,85 800,25 1000,55 C1100,70 1160,45 1200,45"
                  stroke="rgba(245,200,66,.2)"
                  strokeWidth="1"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{ animationDelay: "0.6s", animationDuration: "1.6s,8s" }}
                />
                <path
                  className={styles["noodle-path"]}
                  d="M0,90 C300,50 500,95 700,65 C900,35 1100,90 1200,70"
                  stroke="rgba(245,200,66,.1)"
                  strokeWidth="1"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{ animationDelay: "0.9s", animationDuration: "1.8s,9s" }}
                />
                <circle cx="225" cy="60" r="4" fill="#F5C842" opacity="0.8" />
                <circle cx="450" cy="60" r="4" fill="#F5C842" opacity="0.8" />
                <circle cx="675" cy="60" r="4" fill="#F5C842" opacity="0.8" />
                <circle cx="900" cy="60" r="4" fill="#F5C842" opacity="0.8" />
                <text x="225" y="48" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="rgba(245,200,66,.6)" textAnchor="middle">scrape</text>
                <text x="450" y="48" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="rgba(245,200,66,.6)" textAnchor="middle">analyze</text>
                <text x="675" y="48" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="rgba(245,200,66,.6)" textAnchor="middle">decide</text>
                <text x="900" y="48" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="rgba(245,200,66,.6)" textAnchor="middle">output</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className={styles["stats-bar"]} role="region" aria-label="Key metrics">
        <div className={styles.container}>
          <div className={styles["stats-grid"]}>
            <div className={styles["stat-item"]} data-reveal data-delay="1">
              <div className={styles["stat-num"]}>12x</div>
              <div className={styles["stat-label"]}>less boilerplate than LangChain</div>
            </div>
            <div className={styles["stat-item"]} data-reveal data-delay="2">
              <div className={styles["stat-num"]}>&lt;50ms</div>
              <div className={styles["stat-label"]}>agent-to-agent handoff latency</div>
            </div>
            <div className={styles["stat-item"]} data-reveal data-delay="3">
              <div className={styles["stat-num"]}>MIT</div>
              <div className={styles["stat-label"]}>open source license, forever free</div>
            </div>
            <div className={styles["stat-item"]} data-reveal data-delay="4">
              <div className={styles["stat-num"]}>∞</div>
              <div className={styles["stat-label"]}>agents per pipeline, no limits</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem" className={styles.section} aria-labelledby="problem-h">
        <div className={styles.container}>
          <div className={styles.sh} data-reveal>
            <div className={styles.eyebrow}>The problem</div>
            <h2 className={styles.h2} id="problem-h">
              Multi-agent AI is broken.
              <br />
              We fixed it.
            </h2>
          </div>
          <div className={styles["problem-grid"]}>
            <div className={`${styles.pc} ${styles["is-problem"]}`} data-reveal data-delay="1">
              <div className={`${styles["card-tag"]} ${styles.prob}`}>✗ Before n00dles</div>
              <ul className={styles.pl}>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> 800+ lines of LangChain boilerplate before your first agent runs</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> State management breaks in production under any real load</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> No native retry, timeout, or fallback handling</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> Agent pipelines collapse silently — you find out when the user does</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> Debugging is reading wall-of-text logs at 2am</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> Vendor lock-in to one LLM provider</li>
                <li><span className={styles["li-i"]} style={{ color: "#E24B4A" }}>✗</span> Deploying to production is a separate nightmare</li>
              </ul>
            </div>
            <div className={`${styles.pc} ${styles["is-solution"]}`} data-reveal data-delay="2">
              <div className={`${styles["card-tag"]} ${styles.sol}`}>✓ With n00dles</div>
              <ul className={styles.pl}>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> First agent running in under 10 lines of Python</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> Built-in distributed state store — survives restarts and crashes</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> Retry, timeout, and circuit breaker baked into every node</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> Structured failure propagation with full trace context</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> Visual pipeline debugger with per-agent replay</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> Provider-agnostic — Anthropic, OpenAI, Mistral, local Ollama</li>
                <li><span className={styles["li-i"]} style={{ color: "#1D9E75" }}>✓</span> One command deploy to any cloud or self-host</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={styles.section} aria-labelledby="features-h">
        <div className={styles.container}>
          <div className={`${styles.sh} ${styles.center}`} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>Features</div>
            <h2 className={styles.h2} id="features-h">
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
            <p>n00dles is opinionated about the right way to build multi-agent systems — so you don&apos;t have to be.</p>
          </div>
          <div className={styles["features-grid"]}>
            <div className={styles.fc} data-reveal data-delay="1"><div className={styles["fc-icon"]}>⛓</div><div className={styles["fc-title"]}>Agent Chaining</div><div className={styles["fc-body"]}>Connect agents into pipelines with typed inputs and outputs. Each noodle knows exactly what it receives and what it passes forward.</div></div>
            <div className={styles.fc} data-reveal data-delay="2"><div className={styles["fc-icon"]}>🔄</div><div className={styles["fc-title"]}>Parallel Execution</div><div className={styles["fc-body"]}>Run independent agents simultaneously. n00dles handles fan-out, fan-in, and result merging automatically.</div></div>
            <div className={styles.fc} data-reveal data-delay="3"><div className={styles["fc-icon"]}>💾</div><div className={styles["fc-title"]}>Persistent State</div><div className={styles["fc-body"]}>Pipelines survive crashes, restarts, and scaling events. State is checkpointed after every node.</div></div>
            <div className={styles.fc} data-reveal data-delay="1"><div className={styles["fc-icon"]}>🔁</div><div className={styles["fc-title"]}>Smart Retries</div><div className={styles["fc-body"]}>Exponential backoff, jitter, and configurable retry budgets per agent. Rate limit handling built in for all major LLM providers.</div></div>
            <div className={styles.fc} data-reveal data-delay="2"><div className={styles["fc-icon"]}>🔌</div><div className={styles["fc-title"]}>Provider Agnostic</div><div className={styles["fc-body"]}>One interface for Claude, GPT, Mistral, Gemini, Ollama, and any OpenAI-compatible endpoint. Switch with one config change.</div></div>
            <div className={styles.fc} data-reveal data-delay="3"><div className={styles["fc-icon"]}>🔍</div><div className={styles["fc-title"]}>Full Observability</div><div className={styles["fc-body"]}>Every token, every latency, every tool call logged with structured traces. Integrates with Langfuse, Helicone, and OpenTelemetry.</div></div>
            <div className={styles.fc} data-reveal data-delay="1"><div className={styles["fc-icon"]}>🛡️</div><div className={styles["fc-title"]}>Type-Safe Contracts</div><div className={styles["fc-body"]}>Pydantic models define agent I/O contracts. Schema validation at every node boundary. Catch mismatches at definition time.</div></div>
            <div className={styles.fc} data-reveal data-delay="2"><div className={styles["fc-icon"]}>🧪</div><div className={styles["fc-title"]}>Pipeline Testing</div><div className={styles["fc-body"]}>Mock any agent or LLM provider in tests. Run full pipeline integration tests without spending a single API token.</div></div>
            <div className={styles.fc} data-reveal data-delay="3"><div className={styles["fc-icon"]}>🚀</div><div className={styles["fc-title"]}>One-Command Deploy</div><div className={styles["fc-body"]}>Deploy as serverless functions, Docker containers, or long-running workers. Cloud or self-hosted. <span className={`${styles.mono} ${styles.accent}`}>noodles deploy</span> and you&apos;re live.</div></div>
          </div>
        </div>
      </section>

      {/* CODE DEMO */}
      <section id="demo" className={styles.demo} aria-labelledby="demo-h">
        <div className={styles.container}>
          <div className={styles["demo-grid"]}>
            <div className={styles["demo-text"]} data-reveal>
              <div className={styles.eyebrow}>Code</div>
              <h2 className={styles.h2} id="demo-h">Ship your first pipeline in minutes.</h2>
              <p>No subclassing, no decorators, no configuration YAML. Just Python. Define agents as functions, wire them together, run.</p>
              <div className={styles["cmp-lbl"]}>LINES TO FIRST WORKING PIPELINE</div>
              <div className={styles["demo-compare"]}>
                <div className={styles["cmp-row"]}><span className={styles["cmp-tool"]}>LangChain</span><div className={styles["cmp-bw"]}><div className={styles["cmp-b"]} style={{ width: "90%" }} /></div><span className={styles["cmp-v"]}>~120 lines</span></div>
                <div className={styles["cmp-row"]}><span className={styles["cmp-tool"]}>LangGraph</span><div className={styles["cmp-bw"]}><div className={styles["cmp-b"]} style={{ width: "75%" }} /></div><span className={styles["cmp-v"]}>~90 lines</span></div>
                <div className={styles["cmp-row"]}><span className={styles["cmp-tool"]}>CrewAI</span><div className={styles["cmp-bw"]}><div className={styles["cmp-b"]} style={{ width: "58%" }} /></div><span className={styles["cmp-v"]}>~70 lines</span></div>
                <div className={styles["cmp-row"]}><span className={styles["cmp-tool"]} style={{ color: "var(--yellow)" }}>n00dles</span><div className={styles["cmp-bw"]}><div className={`${styles["cmp-b"]} ${styles.hl}`} style={{ width: "8%" }} /></div><span className={styles["cmp-v"]} style={{ color: "var(--yellow)" }}>10 lines</span></div>
              </div>
            </div>
            <div className={styles["code-window"]} data-reveal data-delay="2">
              <div className={styles["code-tb"]}>
                <div className={`${styles["code-dot"]} ${styles.r}`} />
                <div className={`${styles["code-dot"]} ${styles.y}`} />
                <div className={`${styles["code-dot"]} ${styles.g}`} />
                <span className={styles["code-fn"]}>pipeline.py</span>
              </div>
              <div className={styles["code-tabs"]}>
                <button className={tabBtn(0)} onClick={() => setActiveTab(0)}>Sequential</button>
                <button className={tabBtn(1)} onClick={() => setActiveTab(1)}>Parallel</button>
                <button className={tabBtn(2)} onClick={() => setActiveTab(2)}>Branching</button>
              </div>
              <div className={codePane(0)}>
                <div className={styles["code-body"]}><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.cm}># Define agents as plain Python functions</span>{"\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the given topic and return key facts.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a compelling article from the research.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>editor</span>(draft: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Review and improve the article for clarity.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># Wire agents — retry 3×, 30s timeout</span>{"\n"}content_pipeline <span className={styles.op}>=</span> pipeline({"\n"}    researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>3</span>, timeout<span className={styles.op}>=</span><span className={styles.num}>30</span>{"\n"})
result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;Banking 5.0&quot;</span>){"\n"}<span className={styles.fn}>print</span>(result.output)</div>
              </div>
              <div className={codePane(1)}>
                <div className={styles["code-body"]}><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_news</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Scrape latest news articles for the query.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_twitter</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Pull relevant recent posts for the query.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>merge_signals</span>(scrape_news: <span className={styles.cls}>list</span>, scrape_twitter: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Merge and rank all signals by relevance.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># parallel() runs both scrapers simultaneously</span>{"\n"}intel_pipeline <span className={styles.op}>=</span> pipeline({"\n"}    parallel(scrape_news, scrape_twitter) <span className={styles.op}>&gt;&gt;</span> merge_signals,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>20</span>{"\n"})
result <span className={styles.op}>=</span> run(intel_pipeline, query<span className={styles.op}>=</span><span className={styles.str}>&quot;AI regulation 2026&quot;</span>)</div>
              </div>
              <div className={codePane(2)}>
                <div className={styles["code-body"]}><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, branch, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>classifier</span>(text: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Classify ticket: {`{`} category, confidence {`}`}&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>handle_support</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Handle customer support inquiry.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o-mini&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>handle_billing</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Handle billing and payment inquiry.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># branch() routes to the right specialist</span>{"\n"}triage <span className={styles.op}>=</span> pipeline({"\n"}    classifier <span className={styles.op}>&gt;&gt;</span> branch({"\n"}        support<span className={styles.op}>=</span>handle_support,{"\n"}        billing<span className={styles.op}>=</span>handle_billing,{"\n"}        default<span className={styles.op}>=</span>handle_support,{"\n"}    ),{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>2</span>{"\n"})
result <span className={styles.op}>=</span> run(triage, text<span className={styles.op}>=</span><span className={styles.str}>&quot;My invoice is wrong&quot;</span>)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={styles.section} aria-labelledby="how-h">
        <div className={styles.container}>
          <div className={`${styles.sh} ${styles.center}`} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>How it works</div>
            <h2 className={styles.h2} id="how-h">From zero to production pipeline in four steps.</h2>
          </div>
          <div className={styles["how-steps"]}>
            <div className={styles["step-item"]} data-reveal data-delay="1">
              <div className={styles["step-num"]}>01</div>
              <div className={styles["step-title"]}>Define your agents</div>
              <div className={styles["step-body"]}>Decorate any Python function with <span className={`${styles.mono} ${styles.accent}`}>@agent</span>. Specify the model, prompt, and I/O types.</div>
            </div>
            <div className={styles["step-item"]} data-reveal data-delay="2">
              <div className={styles["step-num"]}>02</div>
              <div className={styles["step-title"]}>Wire the pipeline</div>
              <div className={styles["step-body"]}>Chain with <span className={`${styles.mono} ${styles.accent}`}>&gt;&gt;</span> for sequential, <span className={`${styles.mono} ${styles.accent}`}>parallel()</span> for concurrent, or <span className={`${styles.mono} ${styles.accent}`}>branch()</span> for conditional.</div>
            </div>
            <div className={styles["step-item"]} data-reveal data-delay="3">
              <div className={styles["step-num"]}>03</div>
              <div className={styles["step-title"]}>Run and observe</div>
              <div className={styles["step-body"]}>Run locally with <span className={`${styles.mono} ${styles.accent}`}>run()</span>. Every step is traced. Inspect latency and token costs in the dashboard.</div>
            </div>
            <div className={styles["step-item"]} data-reveal data-delay="4">
              <div className={styles["step-num"]}>04</div>
              <div className={styles["step-title"]}>Deploy anywhere</div>
              <div className={styles["step-body"]}><span className={`${styles.mono} ${styles.accent}`}>noodles deploy</span> ships as serverless, Docker, or a worker. Self-hosted or cloud.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className={styles.section} aria-labelledby="arch-h">
        <div className={styles.container}>
          <div className={styles.sh} data-reveal>
            <div className={styles.eyebrow}>Architecture</div>
            <h2 className={styles.h2} id="arch-h">Built for production from day one.</h2>
            <p>n00dles is a layered runtime, not a prompt-wrapper. Each layer has one job and does it well.</p>
          </div>
          <div className={styles["arch-diagram"]} data-reveal>
            <div className={styles["arch-layers"]}>
              <div className={styles["arch-layer"]}>
                <div className={styles["arch-lbl"]}>YOUR CODE</div>
                <div className={styles["arch-nodes"]}>
                  <div className={`${styles.an} ${styles.hi}`}>@agent functions</div>
                  <div className={`${styles.an} ${styles.hi}`}>pipeline() definitions</div>
                  <div className={`${styles.an} ${styles.hi}`}>run() calls</div>
                </div>
              </div>
              <div className={styles["arch-div"]} />
              <div className={styles["arch-layer"]}>
                <div className={styles["arch-lbl"]}>ORCHESTRATION</div>
                <div className={styles["arch-nodes"]}>
                  <div className={styles.an}>Pipeline executor</div>
                  <div className={styles.an}>State machine</div>
                  <div className={styles.an}>Retry engine</div>
                  <div className={styles.an}>Branch router</div>
                </div>
              </div>
              <div className={styles["arch-div"]} />
              <div className={styles["arch-layer"]}>
                <div className={styles["arch-lbl"]}>RUNTIME</div>
                <div className={styles["arch-nodes"]}>
                  <div className={styles.an}>Async worker pool</div>
                  <div className={styles.an}>State store (Redis / SQLite)</div>
                  <div className={styles.an}>Trace collector</div>
                </div>
              </div>
              <div className={styles["arch-div"]} />
              <div className={styles["arch-layer"]}>
                <div className={styles["arch-lbl"]}>LLM LAYER</div>
                <div className={styles["arch-nodes"]}>
                  <div className={styles.an}>Anthropic Claude</div>
                  <div className={styles.an}>OpenAI GPT</div>
                  <div className={styles.an}>Mistral / Gemini</div>
                  <div className={styles.an}>Ollama (local)</div>
                </div>
              </div>
              <div className={styles["arch-div"]} />
              <div className={styles["arch-layer"]}>
                <div className={styles["arch-lbl"]}>DEPLOY</div>
                <div className={styles["arch-nodes"]}>
                  <div className={styles.an}>AWS Lambda</div>
                  <div className={styles.an}>Docker / K8s</div>
                  <div className={styles.an}>Fly.io / Railway</div>
                  <div className={styles.an}>Self-hosted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section id="compare" className={styles.section} aria-labelledby="cmp-h">
        <div className={styles.container}>
          <div className={`${styles.sh} ${styles.center}`} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>Comparison</div>
            <h2 className={styles.h2} id="cmp-h">How n<span className={styles.accent}>00</span>dles stacks up.</h2>
            <p>We built what we wished existed when we were fighting LangChain at 2am.</p>
          </div>
          <div style={{ overflowX: "auto" }} data-reveal>
            <table className={styles["cmp-table"]} role="table" aria-label="Feature comparison">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className={styles.hl}>n00dles</th>
                  <th>LangChain</th>
                  <th>CrewAI</th>
                  <th>LangGraph</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Lines to first pipeline</td><td className={styles.hl}>~10</td><td>~120</td><td>~70</td><td>~90</td></tr>
                <tr><td>Provider agnostic</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td><span className={styles.mid}>~</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Built-in retry / timeout</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.mid}>~</span></td></tr>
                <tr><td>Persistent state</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Parallel execution</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.mid}>~</span></td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
                <tr><td>Type-safe I/O contracts</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.mid}>~</span></td><td><span className={styles.mid}>~</span></td></tr>
                <tr><td>Visual pipeline debugger</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td></tr>
                <tr><td>One-command deploy</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.xmk}>✗</span></td></tr>
                <tr><td>Pipeline testing (no tokens)</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.mid}>~</span></td><td><span className={styles.xmk}>✗</span></td><td><span className={styles.mid}>~</span></td></tr>
                <tr><td>Open source (MIT)</td><td className={styles.hl}><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td><td><span className={styles.chk}>✓</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className={styles.section} aria-labelledby="uc-h">
        <div className={styles.container}>
          <div className={`${styles.sh} ${styles.center}`} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>Use cases</div>
            <h2 className={styles.h2} id="uc-h">What engineers build with n<span className={styles.accent}>00</span>dles.</h2>
          </div>
          <div className={styles["uc-grid"]}>
            <div className={styles.uc} data-reveal data-delay="1"><div className={styles["uc-tag"]}>Research &amp; Analysis</div><div className={styles["uc-title"]}>Deep research pipelines</div><div className={styles["uc-body"]}>Chain a web scraper → summarizer → analyst → report writer. Run dozens of parallel research threads. Get structured reports from raw web data in seconds.</div></div>
            <div className={styles.uc} data-reveal data-delay="2"><div className={styles["uc-tag"]}>Content Automation</div><div className={styles["uc-title"]}>AI content factories</div><div className={styles["uc-body"]}>Research → draft → SEO optimize → localize → publish. Each stage is an agent. The pipeline runs on schedule and retries gracefully when any LLM call fails.</div></div>
            <div className={styles.uc} data-reveal data-delay="1"><div className={styles["uc-tag"]}>Data Processing</div><div className={styles["uc-title"]}>Document intelligence at scale</div><div className={styles["uc-body"]}>Ingest PDFs and contracts → extract structured data → validate → load to database. n00dles handles 1,000 documents in parallel with full audit trails.</div></div>
            <div className={styles.uc} data-reveal data-delay="2"><div className={styles["uc-tag"]}>Prediction Markets</div><div className={styles["uc-title"]}>Multi-agent prediction systems</div><div className={styles["uc-body"]}>News scraper → sentiment agent → probability estimator → signal aggregator → position recommender. n00dles manages the flow between all 12 agents.</div></div>
            <div className={styles.uc} data-reveal data-delay="1"><div className={styles["uc-tag"]}>Customer Support</div><div className={styles["uc-title"]}>Intelligent support pipelines</div><div className={styles["uc-body"]}>Classify → route to specialist → retrieve context → draft response → human review gate → send. Handle 80% of tickets automatically with full escalation logic.</div></div>
            <div className={styles.uc} data-reveal data-delay="2"><div className={styles["uc-tag"]}>Code &amp; DevOps</div><div className={styles["uc-title"]}>Automated code review pipelines</div><div className={styles["uc-body"]}>PR opens → security scanner → performance reviewer → style checker → summary writer → post comment. Runs on every PR, zero developer overhead.</div></div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className={styles.community} aria-labelledby="comm-h">
        <div className={styles.container}>
          <div className={`${styles.sh} ${styles.center}`} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>Community</div>
            <h2 className={styles.h2} id="comm-h">Engineers are talking.</h2>
          </div>
          <div className={styles["tweet-grid"]}>
            <div className={styles.tw} data-reveal data-delay="1">
              <div className={styles["tw-hd"]}><div className={styles["tw-av"]}>S</div><div><div className={styles["tw-name"]}>Siddharth K.</div><div className={styles["tw-handle"]}>@siddk_dev</div></div></div>
              <div className={styles["tw-body"]}>Replaced 400 lines of LangChain with <span className={styles.hl}>n00dles</span> yesterday. Same behavior, 90% less code, actually readable. This is what I wanted LangChain to be in 2021.</div>
            </div>
            <div className={styles.tw} data-reveal data-delay="2">
              <div className={styles["tw-hd"]}><div className={styles["tw-av"]}>M</div><div><div className={styles["tw-name"]}>María C.</div><div className={styles["tw-handle"]}>@maria_ai_eng</div></div></div>
              <div className={styles["tw-body"]}>The <span className={styles.hl}>built-in retry handling</span> alone is worth the switch. LLM APIs flake. n00dles just... handles it. I haven&apos;t had a failed pipeline wake me up in 3 weeks.</div>
            </div>
            <div className={styles.tw} data-reveal data-delay="3">
              <div className={styles["tw-hd"]}><div className={styles["tw-av"]}>A</div><div><div className={styles["tw-name"]}>Aryan P.</div><div className={styles["tw-handle"]}>@aryan_builds</div></div></div>
              <div className={styles["tw-body"]}>Built a 12-agent research pipeline in an afternoon. With CrewAI this took me a week. <span className={styles.hl}>n00dles just works</span> and the <span className={styles.hl}>&gt;&gt;</span> syntax is insanely clean.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className={styles.cta} aria-labelledby="cta-h">
        <div className={styles.container}>
          <div className={styles["cta-c"]} data-reveal>
            <div className={`${styles.eyebrow} ${styles.center}`}>Get started</div>
            <h2 className={styles["cta-title"]} id="cta-h">
              Stop wrestling
              <br />
              with your pipelines.
            </h2>
            <p className={styles["cta-sub"]}>Your LLM agents should be working. You should be shipping. n00dles gets out of your way.</p>
            <div className={styles["cta-actions"]}>
              <Link href="/quickstart" className={styles["btn-primary"]}>Read the docs →</Link>
              <a href="https://github.com/n00dlehouse" className={styles["btn-ghost"]}>Star on GitHub ★</a>
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
                <li><Link href="/#compare">Compare</Link></li>
                <li><Link href="/blog">Changelog</Link></li>
              </ul>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Developers</h5>
              <ul>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/quickstart">Quickstart</Link></li>
                <li><Link href="/docs">API Reference</Link></li>
                <li><a href="https://github.com/n00dlehouse">GitHub</a></li>
              </ul>
            </div>
            <div className={styles["footer-col"]}>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><a href="https://discord.gg/n00dles">Discord</a></li>
                <li><a href="https://x.com/n00dles_dev">Twitter / X</a></li>
              </ul>
            </div>
          </div>
          <div className={styles["footer-bottom"]}>
            <span>© 2026 n00dles. MIT License. Built with 🍜</span>
            <span className={styles.mono} style={{ fontSize: 12 }}>v0.3.0-beta</span>
          </div>
        </div>
      </footer>
    </>
  );
}
