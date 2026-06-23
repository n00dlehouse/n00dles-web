import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "API Reference",
  title: "pipeline()",
  lead: "Wraps a composed chain of agents into a single named, configured, runnable unit.",
  toc: ["Signature", "Parameters", "Returns", "Examples"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>pipeline</span>({"\n"}    chain: <span className={styles.cls}>Agent</span> <span className={styles.op}>|</span> <span className={styles.cls}>ParallelAgent</span> <span className={styles.op}>|</span> <span className={styles.cls}>BranchAgent</span>,{"\n"}    name: <span className={styles.cls}>str</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    retry: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>3</span>,{"\n"}    timeout: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>60</span>,{"\n"}    on_error: <span className={styles.cls}>Callable</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>Pipeline</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>chain</td><td>Agent | ParallelAgent | BranchAgent</td><td>required</td><td>The composed structure to run — typically built with <code className={styles.code}>&gt;&gt;</code>, <code className={styles.code}>parallel()</code>, or <code className={styles.code}>branch()</code>.</td></tr>
          <tr><td>name</td><td>str | None</td><td>None</td><td>Identifier shown in traces and the dashboard. Defaults to an auto-generated name if omitted.</td></tr>
          <tr><td>retry</td><td>int</td><td>3</td><td>Default retry budget for every agent in the chain that doesn&apos;t set its own.</td></tr>
          <tr><td>timeout</td><td>int</td><td>60</td><td>Default per-agent timeout in seconds for every agent in the chain.</td></tr>
          <tr><td>on_error</td><td>Callable | None</td><td>None</td><td>Called with an <code className={styles.code}>AgentError</code> on failure. Return a fallback value to swallow the error, or <code className={styles.code}>None</code> to re-raise.</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="returns">Returns</h2>
      <p className={styles["doc-p"]}>A <code className={styles.code}>Pipeline</code> instance. It&apos;s callable directly, or passed to <code className={styles.code}>run()</code>, <code className={styles.code}>resume()</code>, or the <code className={styles.code}>noodles deploy</code> CLI.</p>

      <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.cm}># Sequential, with a custom error handler</span>{"\n"}support <span className={styles.op}>=</span> pipeline({"\n"}    classifier <span className={styles.op}>&gt;&gt;</span> branch(billing<span className={styles.op}>=</span>handle_billing, default<span className={styles.op}>=</span>handle_general),{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;support-triage&quot;</span>,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>2</span>,{"\n"}    on_error<span className={styles.op}>=</span>log_and_fallback,{"\n"}){"\n\n"}<span className={styles.cm}># Pipelines compose — a pipeline is a valid chain for another pipeline</span>{"\n"}full <span className={styles.op}>=</span> pipeline(research_pipeline <span className={styles.op}>&gt;&gt;</span> writing_pipeline, name<span className={styles.op}>=</span><span className={styles.str}>&quot;full-content-flow&quot;</span>)</pre>
      </div>
    </>
  );
}
