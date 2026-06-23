import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Core Concepts",
  title: "Pipelines",
  lead: "A pipeline composes agents into a single executable unit — sequential chains, parallel fan-out, or conditional branches — with one shared retry and timeout policy.",
  toc: ["Sequential composition", "Configuring retry & timeout", "Nesting pipelines", "Composition reference"],
};

export function Body({ styles, goTo }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="sequential">Sequential composition</h2>
      <p className={styles["doc-p"]}>
        The <code className={styles.code}>&gt;&gt;</code>{" "}
        operator chains two agents (or pipelines) so the left side&apos;s output becomes the
        right side&apos;s input:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>chain <span className={styles.op}>=</span> researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor{"\n"}content_pipeline <span className={styles.op}>=</span> pipeline(chain)</pre>
      </div>
      <p className={styles["doc-p"]}>
        <code className={styles.code}>pipeline()</code>{" "}
        wraps the composed chain and gives it a name, retry policy, and timeout — it&apos;s the
        unit you pass to{" "}
        <span onClick={() => goTo("run-api")} style={{ color: "var(--yellow)", cursor: "pointer" }}>run()</span> or <span onClick={() => goTo("deploy")} style={{ color: "var(--yellow)", cursor: "pointer" }}>deploy</span>.
      </p>

      <h2 className={styles["doc-h2"]} id="retry-timeout">Configuring retry &amp; timeout</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>content_pipeline <span className={styles.op}>=</span> pipeline({"\n"}    researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>3</span>,        <span className={styles.cm}># per-agent retry attempts</span>{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>60</span>,      <span className={styles.cm}># per-agent timeout, seconds</span>{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;content-pipeline&quot;</span>,  <span className={styles.cm}># shown in dashboard/traces</span>{"\n"})</pre>
      </div>
      <p className={styles["doc-p"]}>
        Retry and timeout set on <code className={styles.code}>pipeline()</code> apply to{" "}
        <strong>each agent independently</strong>, not the chain as a whole. An individual{" "}
        <code className={styles.code}>@agent</code> decorator can override either value for
        itself — the most specific setting wins.
      </p>

      <h2 className={styles["doc-h2"]} id="nesting">Nesting pipelines</h2>
      <p className={styles["doc-p"]}>
        A pipeline is itself a valid left or right operand of <code className={styles.code}>&gt;&gt;</code>,
        so you can build larger systems out of smaller, independently-tested pipelines:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>research_stage <span className={styles.op}>=</span> pipeline(scrape <span className={styles.op}>&gt;&gt;</span> summarize, name<span className={styles.op}>=</span><span className={styles.str}>&quot;research&quot;</span>){"\n"}writing_stage <span className={styles.op}>=</span> pipeline(draft <span className={styles.op}>&gt;&gt;</span> edit, name<span className={styles.op}>=</span><span className={styles.str}>&quot;writing&quot;</span>){"\n\n"}full_pipeline <span className={styles.op}>=</span> pipeline(research_stage <span className={styles.op}>&gt;&gt;</span> writing_stage)</pre>
      </div>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>Nested pipelines show up as collapsible groups in trace views — useful for keeping a 15-agent system readable in the dashboard.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="composition-ref">Composition reference</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Operator / call</th><th>Behavior</th></tr>
        </thead>
        <tbody>
          <tr><td>a &gt;&gt; b</td><td>Sequential — a&apos;s output is b&apos;s input</td></tr>
          <tr><td>parallel(a, b, …)</td><td>Concurrent — all run at once, results merged</td></tr>
          <tr><td>branch(key=agent, …)</td><td>Conditional — routes to exactly one agent based on a classifier&apos;s output</td></tr>
          <tr><td>pipeline(chain, …)</td><td>Wraps any of the above with a name, retry, and timeout</td></tr>
        </tbody>
      </table>
    </>
  );
}
