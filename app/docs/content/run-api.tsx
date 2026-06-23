import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "API Reference",
  title: "run()",
  lead: "Executes a pipeline or a single agent synchronously and returns a RunResult with the output and full trace.",
  toc: ["Signature", "Parameters", "RunResult", "Examples"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>run</span>({"\n"}    target: <span className={styles.cls}>Pipeline</span> <span className={styles.op}>|</span> <span className={styles.cls}>Agent</span>,{"\n"}    timeout: <span className={styles.cls}>int</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    tags: <span className={styles.cls}>list</span>[<span className={styles.cls}>str</span>] <span className={styles.op}>=</span> [],{"\n"}    <span className={styles.op}>**</span>inputs,{"\n"}) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>RunResult</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>target</td><td>Pipeline | Agent</td><td>required</td><td>What to execute. A bare agent runs as a one-step pipeline.</td></tr>
          <tr><td>timeout</td><td>int | None</td><td>None</td><td>Overrides the whole-run timeout. None defers to the pipeline&apos;s own setting.</td></tr>
          <tr><td>tags</td><td>list[str]</td><td>[]</td><td>Extra tags merged onto this run&apos;s trace, on top of any tags set on individual agents.</td></tr>
          <tr><td>**inputs</td><td>any</td><td>—</td><td>Keyword arguments forwarded to the first agent in the chain.</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="run-result">RunResult</h2>
      <p className={styles["doc-p"]}>The object returned by every successful run:</p>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>output</td><td>any</td><td>The final agent&apos;s return value</td></tr>
          <tr><td>run_id</td><td>str</td><td>Unique ID for this run — pass to <code className={styles.code}>resume()</code> if interrupted</td></tr>
          <tr><td>duration_ms</td><td>int</td><td>Wall-clock time for the whole run</td></tr>
          <tr><td>total_tokens</td><td>int</td><td>Summed token usage across every agent call, including retries</td></tr>
          <tr><td>agent_traces</td><td>list[AgentTrace]</td><td>Per-agent timing, status, and token usage, in execution order</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.cm}># Run a full pipeline</span>{"\n"}result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;Banking 5.0&quot;</span>){"\n\n"}<span className={styles.cm}># Run a single agent directly — useful for testing one step in isolation</span>{"\n"}result <span className={styles.op}>=</span> run(researcher, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;Banking 5.0&quot;</span>){"\n\n"}<span className={styles.cm}># Override timeout and tag this run for filtering in the dashboard</span>{"\n"}result <span className={styles.op}>=</span> run(content_pipeline, timeout<span className={styles.op}>=</span><span className={styles.num}>120</span>, tags<span className={styles.op}>=</span>[<span className={styles.str}>&quot;backfill&quot;</span>], topic<span className={styles.op}>=</span><span className={styles.str}>&quot;...&quot;</span>)</pre>
      </div>
    </>
  );
}
