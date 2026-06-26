import Link from "next/link";
import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "announcing-v0-1-0-public-beta",
  tag: "Release",
  title: "Announcing n00dles v0.1.0 — public beta",
  excerpt:
    "After six months of internal development and two production deployments, we're open-sourcing n00dles.",
  author: { name: "Pho Nguyen", role: "VP Engineering", initials: "PN" },
  date: "April 1, 2026",
  readTime: "5 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        Today we&apos;re open-sourcing n00dles — the multi-agent orchestration layer we built
        internally, ran across two production deployments, and decided was good enough to stop
        keeping to ourselves. It&apos;s MIT licensed, it&apos;s on PyPI now, and{" "}
        <code className={styles.code}>pip install get-n00dles</code> is the whole installation
        story.
      </p>

      <h2 className={styles["doc-h2"]} id="whats-in">What&apos;s actually in v0.1.0</h2>
      <p className={styles["doc-p"]}>
        We&apos;d rather under-promise here than have you discover gaps the hard way, so here&apos;s
        exactly what&apos;s shipped in this release — sequential composition, end to end:
      </p>
      <ul className={styles["doc-ul"]}>
        <li>The <code className={styles.code}>@agent</code> decorator — your docstring becomes the system prompt, your type hints become the validated I/O contract.</li>
        <li><code className={styles.code}>pipeline()</code> and <code className={styles.code}>&gt;&gt;</code> for chaining agents, plus <code className={styles.code}>run()</code>/<code className={styles.code}>arun()</code> to execute them.</li>
        <li>Provider support for every major LLM through <a href="https://github.com/BerriAI/litellm">litellm</a> — Anthropic, OpenAI, Mistral, Gemini, Ollama, and more, switchable per agent with a string.</li>
        <li>Retry with exponential backoff and jitter, per-node timeouts, and <code className={styles.code}>fallback=</code> agents — all configurable per agent or per pipeline.</li>
        <li>A SQLite state store, on by default, with checkpoint-after-every-node and resume-from-crash built in — no configuration required to get it.</li>
        <li>Pydantic v2 validation for structured agent outputs, with a clear <code className={styles.code}>AgentOutputError</code> when a response doesn&apos;t fit.</li>
        <li>Structured trace events for every agent call, plus an optional OpenTelemetry exporter (<code className={styles.code}>pip install get-n00dles[otel]</code>).</li>
      </ul>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the topic. Return 3 key facts.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a short article from the research.&quot;&quot;&quot;</span>{"\n\n"}result <span className={styles.op}>=</span> run(pipeline(researcher <span className={styles.op}>&gt;&gt;</span> writer, retry<span className={styles.op}>=</span><span className={styles.num}>3</span>), topic<span className={styles.op}>=</span><span className={styles.str}>&quot;multi-agent orchestration&quot;</span>)</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="whats-not">What&apos;s deliberately not in this release</h2>
      <p className={styles["doc-p"]}>
        v0.1.0 is sequential composition only — every pipeline is a straight line of{" "}
        <code className={styles.code}>&gt;&gt;</code>. Fan-out and conditional routing, a
        circuit breaker, distributed state backends, and a deploy CLI are all real plans, not
        vague ones, but none of them are in your hands today. We&apos;d rather ship a smaller
        surface that does exactly what it claims than a larger one with corners that don&apos;t
        quite work yet.
      </p>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>
          Track what&apos;s shipped versus planned on the{" "}
          <Link href="/blog#cl" style={{ color: "var(--yellow)" }}>changelog</Link> as we
          go — we&apos;d rather you find out from there than from a surprised GitHub issue.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="why-now">Why open source it now, not later</h2>
      <p className={styles["doc-p"]}>
        We could have kept building internally and waited for a more feature-complete release.
        We didn&apos;t, because the core problem n00dles solves — reliable, typed, checkpointed
        multi-agent execution without 4,000 lines of glue code — is already real and already
        useful at this scope. Waiting for fan-out and a CLI to exist before letting anyone else
        use the sequential core felt like optimizing for our roadmap instead of for the people
        who need this today.
      </p>
      <p className={styles["doc-p"]}>
        Install it, read the <Link href="/quickstart" style={{ color: "var(--yellow)" }}>five-minute quickstart</Link>, and tell us where
        it breaks — on <a href="https://github.com/n00dlehouse">GitHub</a> or in the{" "}
        <a href="https://discord.gg/n00dles">Discord</a>. We&apos;re shipping this in the open
        from here on, changelog and all.
      </p>
    </>
  );
}
