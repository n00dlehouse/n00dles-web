import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Core Concepts",
  title: "Error Handling",
  lead: "Retry, circuit breakers, and structured failure propagation are built into every agent — you opt out of them, not into them.",
  toc: ["Retry behavior", "Circuit breakers", "Custom error handlers", "Inspecting failures"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="retry-behavior">Retry behavior</h2>
      <p className={styles["doc-p"]}>
        Every agent retries on transient failures — rate limits, timeouts, connection resets —
        using exponential backoff with jitter. Non-transient failures (a validation error on the
        output type, for instance) are not retried, since retrying won&apos;t fix a malformed
        response on its own.
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>, retry<span className={styles.op}>=</span><span className={styles.num}>5</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>flaky_call</span>(x: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;...&quot;&quot;&quot;</span>{"\n"}<span className={styles.cm}># backoff: ~1s, ~2s, ~4s, ~8s, ~16s (± jitter), then raises</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="circuit-breakers">Circuit breakers</h2>
      <p className={styles["doc-p"]}>
        If an agent fails its retry budget <code className={styles.code}>N</code>{" "}
        times in a row across separate calls (not just within one run), its circuit opens —
        further calls fail immediately without hitting the LLM, for a cooldown window. This
        protects you from hammering a provider that&apos;s already down.
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, CircuitBreaker{"\n\n"}<span className={styles.kw}>@agent</span>({"\n"}    model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>,{"\n"}    circuit_breaker<span className={styles.op}>=</span>CircuitBreaker(failure_threshold<span className={styles.op}>=</span><span className={styles.num}>5</span>, cooldown_s<span className={styles.op}>=</span><span className={styles.num}>30</span>){"\n"}){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>summarize</span>(text: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;...&quot;&quot;&quot;</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="custom-handlers">Custom error handlers</h2>
      <p className={styles["doc-p"]}>Attach <code className={styles.code}>on_error</code> to a pipeline to react to a failure — log it, page someone, or fall back to a default value instead of raising:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>handle_failure</span>(error: <span className={styles.cls}>AgentError</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span>:{"\n"}    <span className={styles.kw}>if</span> error.agent_name <span className={styles.op}>==</span> <span className={styles.str}>&quot;classifier&quot;</span>:{"\n"}        <span className={styles.kw}>return</span> <span className={styles.str}>&quot;general&quot;</span>  <span className={styles.cm}># fall back to a default category</span>{"\n"}    <span className={styles.kw}>return</span> <span className={styles.cls}>None</span>  <span className={styles.cm}># None re-raises</span>{"\n\n"}triage <span className={styles.op}>=</span> pipeline(classifier <span className={styles.op}>&gt;&gt;</span> handle_support, on_error<span className={styles.op}>=</span>handle_failure)</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="inspecting">Inspecting failures</h2>
      <p className={styles["doc-p"]}>Every <code className={styles.code}>RunResult</code> carries the full trace, even on failure:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> AgentError{"\n\n"}<span className={styles.kw}>try</span>:{"\n"}    result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;...&quot;</span>){"\n"}<span className={styles.kw}>except</span> <span className={styles.cls}>AgentError</span> <span className={styles.kw}>as</span> e:{"\n"}    <span className={styles.fn}>print</span>(e.agent_name, e.attempt, e.cause){"\n"}    <span className={styles.kw}>for</span> step <span className={styles.kw}>in</span> e.trace.agent_traces:{"\n"}        <span className={styles.fn}>print</span>(step.name, step.status, step.duration_ms)</pre>
      </div>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>On managed cloud, the same trace renders as a visual timeline in the dashboard — no need to print it yourself.</div>
      </div>
    </>
  );
}
