import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "API Reference",
  title: "parallel()",
  lead: "Runs multiple agents concurrently against the same input and merges their results — n00dles handles the fan-out and fan-in for you.",
  toc: ["Signature", "Parameters", "Result shape", "Examples"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>parallel</span>({"\n"}    <span className={styles.op}>*</span>agents: <span className={styles.cls}>Agent</span>,{"\n"}    max_concurrency: <span className={styles.cls}>int</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>ParallelAgent</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>*agents</td><td>Agent</td><td>required</td><td>Two or more agents to run concurrently. Each receives the same input.</td></tr>
          <tr><td>max_concurrency</td><td>int | None</td><td>None</td><td>Caps how many of the agents run at once. None runs all of them simultaneously.</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="result-shape">Result shape</h2>
      <p className={styles["doc-p"]}>
        The next agent in the chain receives a <code className={styles.code}>dict</code>{" "}
        keyed by each upstream agent&apos;s function name — no manual merging required:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>merge_signals</span>(scrape_news: <span className={styles.cls}>list</span>, scrape_twitter: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Merge and rank both signals. Parameter names match the upstream agents&apos; function names exactly.&quot;&quot;&quot;</span></pre>
      </div>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>If a downstream agent only declares <em>some</em> of the upstream parameter names, n00dles passes just those — you don&apos;t have to accept every branch&apos;s output.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_news</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Scrape latest news for the query.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_twitter</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Pull recent posts for the query.&quot;&quot;&quot;</span>{"\n\n"}intel <span className={styles.op}>=</span> pipeline(parallel(scrape_news, scrape_twitter) <span className={styles.op}>&gt;&gt;</span> merge_signals, timeout<span className={styles.op}>=</span><span className={styles.num}>20</span>){"\n"}result <span className={styles.op}>=</span> run(intel, query<span className={styles.op}>=</span><span className={styles.str}>&quot;AI regulation 2026&quot;</span>)</pre>
      </div>
    </>
  );
}
