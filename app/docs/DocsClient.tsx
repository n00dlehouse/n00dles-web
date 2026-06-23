"use client";

import { useState } from "react";
import Link from "next/link";
import { useCopy } from "@/lib/useCopy";
import styles from "./page.module.css";

const PAGE_TITLES: Record<string, string> = {
  quickstart: "Quick Start",
  "first-pipeline": "Your First Pipeline",
  pipelines: "Pipelines",
  state: "State Management",
  errors: "Error Handling",
  "pipeline-api": "pipeline()",
  "run-api": "run()",
  "parallel-api": "parallel()",
  "branch-api": "branch()",
  deploy: "Production Deploy",
  testing: "Testing",
  obs: "Observability",
};

const IMPLEMENTED_PAGES = ["installation", "agents", "agent-api"];

export function DocsClient() {
  const [navOpen, setNavOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["start", "api"]);
  const [activePage, setActivePage] = useState("installation");
  const [copied0, copy0] = useCopy();

  const toggleSection = (id: string) =>
    setOpenSections((sections) =>
      sections.includes(id) ? sections.filter((x) => x !== id) : [...sections, id]
    );

  const isOpen = (id: string) => openSections.includes(id);
  const sectionClass = (id: string) => `${styles["sb-section"]}${isOpen(id) ? ` ${styles.open}` : ""}`;
  const linkClass = (id: string) => `${styles["sb-link"]}${activePage === id ? ` ${styles.active}` : ""}`;
  const isImplemented = IMPLEMENTED_PAGES.includes(activePage);
  const paneClass = (id: string) => `${styles["doc-pane"]}${activePage === id ? ` ${styles.active}` : ""}`;
  const tocClass = (id: string) =>
    `${styles["toc-section"]}${activePage === id ? "" : ` ${styles["hidden-toc"]}`}`;

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
            <a href="https://github.com/n00dles/n00dles" className={styles["nav-cta"]}>★ GitHub</a>
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

          <div className={sectionClass("start")}>
            <div className={styles["sb-section-hd"]} onClick={() => toggleSection("start")}>
              <span className={styles["sb-section-hd-text"]}>Getting Started</span>
              <span className={styles["sb-chevron"]}>›</span>
            </div>
            <div className={styles["sb-items"]}>
              <span className={linkClass("installation")} onClick={() => setActivePage("installation")}>Installation</span>
              <span className={linkClass("quickstart")} onClick={() => setActivePage("quickstart")}>Quick start</span>
              <span className={linkClass("first-pipeline")} onClick={() => setActivePage("first-pipeline")}>Your first pipeline</span>
            </div>
          </div>

          <div className={sectionClass("concepts")}>
            <div className={styles["sb-section-hd"]} onClick={() => toggleSection("concepts")}>
              <span className={styles["sb-section-hd-text"]}>Core Concepts</span>
              <span className={styles["sb-chevron"]}>›</span>
            </div>
            <div className={styles["sb-items"]}>
              <span className={linkClass("agents")} onClick={() => setActivePage("agents")}>Agents</span>
              <span className={linkClass("pipelines")} onClick={() => setActivePage("pipelines")}>Pipelines</span>
              <span className={linkClass("state")} onClick={() => setActivePage("state")}>State management</span>
              <span className={linkClass("errors")} onClick={() => setActivePage("errors")}>Error handling</span>
            </div>
          </div>

          <div className={sectionClass("api")}>
            <div className={styles["sb-section-hd"]} onClick={() => toggleSection("api")}>
              <span className={styles["sb-section-hd-text"]}>API Reference</span>
              <span className={styles["sb-chevron"]}>›</span>
            </div>
            <div className={styles["sb-items"]}>
              <span className={linkClass("agent-api")} onClick={() => setActivePage("agent-api")}>@agent</span>
              <span className={linkClass("pipeline-api")} onClick={() => setActivePage("pipeline-api")}>pipeline()</span>
              <span className={linkClass("run-api")} onClick={() => setActivePage("run-api")}>run()</span>
              <span className={linkClass("parallel-api")} onClick={() => setActivePage("parallel-api")}>parallel()</span>
              <span className={linkClass("branch-api")} onClick={() => setActivePage("branch-api")}>branch()</span>
            </div>
          </div>

          <div className={sectionClass("guides")}>
            <div className={styles["sb-section-hd"]} onClick={() => toggleSection("guides")}>
              <span className={styles["sb-section-hd-text"]}>Guides</span>
              <span className={styles["sb-chevron"]}>›</span>
            </div>
            <div className={styles["sb-items"]}>
              <span className={linkClass("deploy")} onClick={() => setActivePage("deploy")}>Production deploy</span>
              <span className={linkClass("testing")} onClick={() => setActivePage("testing")}>Testing</span>
              <span className={linkClass("obs")} onClick={() => setActivePage("obs")}>Observability</span>
            </div>
          </div>

          <div className={sectionClass("ex")}>
            <div className={styles["sb-section-hd"]} onClick={() => toggleSection("ex")}>
              <span className={styles["sb-section-hd-text"]}>Examples</span>
              <span className={styles["sb-chevron"]}>›</span>
            </div>
            <div className={styles["sb-items"]}>
              <span className={styles["sb-link"]}>Research pipeline</span>
              <span className={styles["sb-link"]}>Content factory</span>
              <span className={styles["sb-link"]}>Document processor</span>
              <span className={styles["sb-link"]}>Support triage</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles["docs-main"]}>
          {/* INSTALLATION */}
          <div className={paneClass("installation")}>
            <div className={styles["doc-breadcrumb"]}>Getting Started <span>›</span> Installation</div>
            <h1 className={styles["doc-title"]}>Installation</h1>
            <p className={styles["doc-lead"]}>Get n00dles running in your Python environment. The core package has minimal dependencies and installs in seconds.</p>

            <h2 className={styles["doc-h2"]} id="requirements">Requirements</h2>
            <ul className={styles["doc-ul"]}>
              <li>Python 3.10 or later</li>
              <li>pip 22+ or Poetry 1.5+</li>
              <li>At least one LLM API key (Anthropic, OpenAI, etc.)</li>
            </ul>

            <h2 className={styles["doc-h2"]} id="install">Install</h2>
            <p className={styles["doc-p"]}>Install from PyPI with pip:</p>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}>
                <span className={styles["code-lang"]}>bash</span>
                <button
                  className={`${styles["code-copy"]}${copied0 ? ` ${styles.copied}` : ""}`}
                  onClick={() => copy0("pip install n00dles")}
                >
                  {copied0 ? "copied!" : "copy"}
                </button>
              </div>
              <pre>pip install n00dles</pre>
            </div>
            <p className={styles["doc-p"]}>Or with Poetry:</p>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
              <pre>poetry add n00dles</pre>
            </div>
            <div className={`${styles.callout} ${styles.info}`}>
              <span className={styles["callout-icon"]}>ℹ</span>
              <div>For the latest unreleased features, install from GitHub: <code className={styles.code}>pip install git+https://github.com/n00dles/n00dles</code></div>
            </div>

            <h2 className={styles["doc-h2"]} id="api-keys">Configure API keys</h2>
            <p className={styles["doc-p"]}>n00dles reads LLM credentials from environment variables. Set the key for your preferred provider:</p>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
              <pre><span className={styles.cm}># Anthropic (recommended)</span>{"\n"}export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;{"\n\n"}<span className={styles.cm}># OpenAI</span>{"\n"}export OPENAI_API_KEY=&quot;sk-...&quot;{"\n\n"}<span className={styles.cm}># Mistral</span>{"\n"}export MISTRAL_API_KEY=&quot;...&quot;</pre>
            </div>
            <div className={`${styles.callout} ${styles.tip}`}>
              <span className={styles["callout-icon"]}>✓</span>
              <div>Add these to your <code className={styles.code}>.env</code> file and use <code className={styles.code}>python-dotenv</code> — n00dles will pick them up automatically.</div>
            </div>

            <h2 className={styles["doc-h2"]} id="verify">Verify installation</h2>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> version{"\n"}<span className={styles.fn}>print</span>(version())  <span className={styles.cm}># → &quot;0.1.0&quot;</span></pre>
            </div>

            <div className={styles["doc-nav"]}>
              <div></div>
              <span className={`${styles["doc-nav-link"]} ${styles.next}`} onClick={() => setActivePage("quickstart")}>
                <span className={styles["nav-dir"]}>NEXT →</span>
                <span className={styles["nav-title"]}>Quick start</span>
              </span>
            </div>
          </div>

          {/* AGENTS */}
          <div className={paneClass("agents")}>
            <div className={styles["doc-breadcrumb"]}>Core Concepts <span>›</span> Agents</div>
            <h1 className={styles["doc-title"]}>Agents</h1>
            <p className={styles["doc-lead"]}>An agent is an LLM-backed function with typed inputs and outputs. In n00dles, you define one by decorating any Python function with <code className={styles.code}>@agent</code>.</p>

            <h2 className={styles["doc-h2"]} id="defining">Defining an agent</h2>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>summarizer</span>(text: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Summarize the given text in three concise sentences.&quot;&quot;&quot;</span></pre>
            </div>
            <p className={styles["doc-p"]}>The function&apos;s <strong>docstring</strong> becomes the system prompt. The <strong>type annotations</strong> define the contract — n00dles validates input and output against them automatically.</p>

            <h2 className={styles["doc-h2"]} id="how-it-works">How it works</h2>
            <p className={styles["doc-p"]}>When you call an agent, n00dles:</p>
            <ul className={styles["doc-ul"]}>
              <li>Validates the input against the type annotations</li>
              <li>Constructs a prompt from the docstring + serialized input</li>
              <li>Calls the specified LLM with retry + timeout logic</li>
              <li>Parses and validates the typed output</li>
              <li>Emits a structured trace event</li>
            </ul>

            <h2 className={styles["doc-h2"]} id="output-types">Output types</h2>
            <p className={styles["doc-p"]}>Agents support all standard Python types as outputs. For structured data, use Pydantic models:</p>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.kw}>from</span> <span className={styles.cls}>pydantic</span> <span className={styles.kw}>import</span> BaseModel{"\n"}<span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent{"\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Sentiment</span>(BaseModel):{"\n"}    label: <span className={styles.cls}>str</span>       <span className={styles.cm}># &quot;positive&quot; | &quot;negative&quot; | &quot;neutral&quot;</span>{"\n"}    confidence: <span className={styles.cls}>float</span>  <span className={styles.cm}># 0.0 – 1.0</span>{"\n"}    summary: <span className={styles.cls}>str</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>analyze_sentiment</span>(review: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>Sentiment</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Analyze the sentiment of the product review.&quot;&quot;&quot;</span>{"\n\n"}result <span className={styles.op}>=</span> analyze_sentiment(<span className={styles.str}>&quot;Absolutely love this product!&quot;</span>){"\n"}<span className={styles.fn}>print</span>(result.label)       <span className={styles.cm}># → &quot;positive&quot;</span>{"\n"}<span className={styles.fn}>print</span>(result.confidence)  <span className={styles.cm}># → 0.97</span></pre>
            </div>

            <h2 className={styles["doc-h2"]} id="override-prompt">Overriding the prompt</h2>
            <p className={styles["doc-p"]}>Use the <code className={styles.code}>prompt</code> parameter to supply a system prompt explicitly, independent of the docstring:</p>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.kw}>@agent</span>({"\n"}    model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>,{"\n"}    prompt<span className={styles.op}>=</span><span className={styles.str}>&quot;&quot;&quot;You are a financial analyst specializing in tech sector equities.{"\n"}Provide structured analysis with explicit uncertainty estimates.&quot;&quot;&quot;</span>{"\n"}){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>equity_analyst</span>(ticker: <span className={styles.cls}>str</span>, context: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Analyze the equity.&quot;&quot;&quot;</span></pre>
            </div>

            <div className={styles["doc-nav"]}>
              <span className={`${styles["doc-nav-link"]} ${styles.prev}`} onClick={() => setActivePage("installation")}>
                <span className={styles["nav-dir"]}>← PREV</span>
                <span className={styles["nav-title"]}>Installation</span>
              </span>
              <span className={`${styles["doc-nav-link"]} ${styles.next}`} onClick={() => setActivePage("pipelines")}>
                <span className={styles["nav-dir"]}>NEXT →</span>
                <span className={styles["nav-title"]}>Pipelines</span>
              </span>
            </div>
          </div>

          {/* @agent API REFERENCE */}
          <div className={paneClass("agent-api")}>
            <div className={styles["doc-breadcrumb"]}>API Reference <span>›</span> @agent</div>
            <h1 className={styles["doc-title"]}>@agent</h1>
            <p className={styles["doc-lead"]}>The <code className={styles.code}>@agent</code> decorator transforms any Python function into an LLM-backed agent with built-in retry, timeout, type validation, and tracing.</p>

            <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.fn}>@agent</span>({"\n"}    model: <span className={styles.cls}>str</span>,{"\n"}    prompt: <span className={styles.cls}>str</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    timeout: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>60</span>,{"\n"}    retry: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>3</span>,{"\n"}    temperature: <span className={styles.cls}>float</span> <span className={styles.op}>=</span> <span className={styles.num}>0.7</span>,{"\n"}    max_tokens: <span className={styles.cls}>int</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    tags: <span className={styles.cls}>list</span>[<span className={styles.cls}>str</span>] <span className={styles.op}>=</span> [],{"\n"})</pre>
            </div>

            <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
            <table className={styles["param-table"]}>
              <thead>
                <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>model</td><td>str</td><td>required</td><td>The LLM model identifier. e.g. &quot;claude-sonnet-4-6&quot;, &quot;gpt-4o&quot;, &quot;mistral-large&quot;.</td></tr>
                <tr><td>prompt</td><td>str | None</td><td>None</td><td>System prompt. If None, the function&apos;s docstring is used.</td></tr>
                <tr><td>timeout</td><td>int</td><td>60</td><td>Timeout in seconds per attempt. Raises TimeoutError if exceeded.</td></tr>
                <tr><td>retry</td><td>int</td><td>3</td><td>Maximum retry attempts on transient failures. Uses exponential backoff with jitter.</td></tr>
                <tr><td>temperature</td><td>float</td><td>0.7</td><td>LLM sampling temperature (0.0–2.0). Lower = more deterministic.</td></tr>
                <tr><td>max_tokens</td><td>int | None</td><td>None</td><td>Cap on output tokens. None defers to model default.</td></tr>
                <tr><td>tags</td><td>list[str]</td><td>[]</td><td>Arbitrary tags attached to trace events for filtering in the dashboard.</td></tr>
              </tbody>
            </table>

            <h2 className={styles["doc-h2"]} id="returns">Returns</h2>
            <p className={styles["doc-p"]}>The decorator returns a callable with the same signature as the decorated function. The return type is the declared return annotation, validated via Pydantic.</p>
            <div className={`${styles.callout} ${styles.warn}`}>
              <span className={styles["callout-icon"]}>⚠</span>
              <div>If the LLM output cannot be coerced into the declared return type after all retries, an <code className={styles.code}>AgentOutputError</code> is raised.</div>
            </div>

            <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
            <div className={styles["code-block"]}>
              <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
              <pre><span className={styles.cm}># Minimal — model is the only required arg</span>{"\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>translator</span>(text: <span className={styles.cls}>str</span>, target_lang: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Translate the text into the target language.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># With overrides for a production-critical agent</span>{"\n"}<span className={styles.kw}>@agent</span>({"\n"}    model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>120</span>,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>5</span>,{"\n"}    temperature<span className={styles.op}>=</span><span className={styles.num}>0.2</span>,{"\n"}    tags<span className={styles.op}>=</span>[<span className={styles.str}>&quot;production&quot;</span>, <span className={styles.str}>&quot;kyc&quot;</span>]{"\n"}){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>kyc_extractor</span>(document: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>CustomerRecord</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Extract structured KYC data from the document.&quot;&quot;&quot;</span></pre>
            </div>

            <div className={styles["doc-nav"]}>
              <span className={`${styles["doc-nav-link"]} ${styles.prev}`} onClick={() => setActivePage("agents")}>
                <span className={styles["nav-dir"]}>← PREV</span>
                <span className={styles["nav-title"]}>Agents</span>
              </span>
              <span className={`${styles["doc-nav-link"]} ${styles.next}`} onClick={() => setActivePage("pipeline-api")}>
                <span className={styles["nav-dir"]}>NEXT →</span>
                <span className={styles["nav-title"]}>pipeline()</span>
              </span>
            </div>
          </div>

          {/* Generic fallback for unimplemented pages */}
          <div className={`${styles["doc-pane"]}${!isImplemented ? ` ${styles.active}` : ""}`}>
            <div className={styles["doc-breadcrumb"]}>Docs</div>
            <h1 className={styles["doc-title"]}>{PAGE_TITLES[activePage] || "Documentation"}</h1>
            <p className={styles["doc-lead"]}>This section of the documentation is being written. Check back soon, or <a href="https://discord.gg/n00dles" style={{ color: "var(--yellow)" }}>ask on Discord</a>.</p>
            <div className={`${styles.callout} ${styles.info}`}>
              <span className={styles["callout-icon"]}>ℹ</span>
              <div>Want to contribute docs? Open a PR at <code className={styles.code}>github.com/n00dles/n00dles/docs</code> — we merge fast.</div>
            </div>
          </div>
        </main>

        {/* TOC */}
        <div className={styles["docs-toc"]} aria-label="On this page">
          <div className={styles["toc-label"]}>On this page</div>
          <div className={tocClass("installation")}>
            <a className={`${styles["toc-link"]} ${styles.active}`}>Requirements</a>
            <a className={styles["toc-link"]}>Install</a>
            <a className={styles["toc-link"]}>Configure API keys</a>
            <a className={styles["toc-link"]}>Verify installation</a>
          </div>
          <div className={tocClass("agents")}>
            <a className={`${styles["toc-link"]} ${styles.active}`}>Defining an agent</a>
            <a className={styles["toc-link"]}>How it works</a>
            <a className={styles["toc-link"]}>Output types</a>
            <a className={styles["toc-link"]}>Overriding the prompt</a>
          </div>
          <div className={tocClass("agent-api")}>
            <a className={`${styles["toc-link"]} ${styles.active}`}>Signature</a>
            <a className={styles["toc-link"]}>Parameters</a>
            <a className={styles["toc-link"]}>Returns</a>
            <a className={styles["toc-link"]}>Examples</a>
          </div>
          <div className={`${styles["toc-section"]}${!isImplemented ? "" : ` ${styles["hidden-toc"]}`}`}>
            <a className={`${styles["toc-link"]} ${styles.active}`}>Overview</a>
          </div>
        </div>
      </div>

      <div className={styles["docs-footer"]}>
        <div>© 2026 n00dles · <a href="https://github.com/n00dles/n00dles">GitHub</a> · <a href="https://discord.gg/n00dles">Discord</a></div>
        <div>Edit this page on <a href="https://github.com/n00dles/n00dles">GitHub →</a></div>
      </div>
    </>
  );
}
