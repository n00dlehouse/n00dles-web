import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Guides",
  title: "Testing",
  lead: "Mock any agent or LLM provider and run full pipeline integration tests without spending a single API token.",
  toc: ["Mocking individual agents", "Mocking a whole pipeline", "Snapshot testing outputs"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="mock-agent">Mocking individual agents</h2>
      <p className={styles["doc-p"]}>
        <code className={styles.code}>mock_agent</code>{" "}
        swaps an agent&apos;s implementation for a fixed return value for the duration of the
        context manager — no network call happens:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles.testing</span> <span className={styles.kw}>import</span> mock_agent{"\n\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>test_writer_uses_research</span>():{"\n"}    <span className={styles.kw}>with</span> mock_agent(researcher, returns<span className={styles.op}>=</span><span className={styles.str}>&quot;fact 1, fact 2, fact 3&quot;</span>):{"\n"}        result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;test topic&quot;</span>){"\n"}    <span className={styles.kw}>assert</span> <span className={styles.str}>&quot;fact 1&quot;</span> <span className={styles.kw}>in</span> result.output</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="mock-pipeline">Mocking a whole pipeline</h2>
      <p className={styles["doc-p"]}>For tests where you only care about what calls a pipeline, not what the pipeline does, mock every agent at once:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles.testing</span> <span className={styles.kw}>import</span> mock_pipeline{"\n\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>test_endpoint_calls_pipeline</span>():{"\n"}    <span className={styles.kw}>with</span> mock_pipeline(content_pipeline, returns<span className={styles.op}>=</span><span className={styles.str}>&quot;mocked article&quot;</span>):{"\n"}        response <span className={styles.op}>=</span> client.post(<span className={styles.str}>&quot;/generate&quot;</span>, json<span className={styles.op}>=</span>{"{"}<span className={styles.str}>&quot;topic&quot;</span>: <span className={styles.str}>&quot;x&quot;</span>{"}"}){"\n"}    <span className={styles.kw}>assert</span> response.status_code <span className={styles.op}>==</span> <span className={styles.num}>200</span></pre>
      </div>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>Both <code className={styles.code}>mock_agent</code> and <code className={styles.code}>mock_pipeline</code> work as decorators too, if you&apos;d rather not nest a <code className={styles.code}>with</code> block.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="snapshot">Snapshot testing outputs</h2>
      <p className={styles["doc-p"]}>For agents with structured (Pydantic) output, snapshot the shape rather than the exact LLM text — LLM outputs vary token-for-token even at temperature 0 across model versions:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>test_sentiment_shape</span>():{"\n"}    result <span className={styles.op}>=</span> run(analyze_sentiment, review<span className={styles.op}>=</span><span className={styles.str}>&quot;Great product!&quot;</span>){"\n"}    <span className={styles.kw}>assert</span> result.output.label <span className={styles.kw}>in</span> (<span className={styles.str}>&quot;positive&quot;</span>, <span className={styles.str}>&quot;negative&quot;</span>, <span className={styles.str}>&quot;neutral&quot;</span>){"\n"}    <span className={styles.kw}>assert</span> <span className={styles.num}>0.0</span> <span className={styles.op}>&lt;=</span> result.output.confidence <span className={styles.op}>&lt;=</span> <span className={styles.num}>1.0</span></pre>
      </div>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>Reserve real LLM calls (no mocking) for a small set of CI &quot;canary&quot; tests that run on a schedule, not on every PR — that keeps your test suite both fast and free of flaky model-output assertions.</div>
      </div>
    </>
  );
}
