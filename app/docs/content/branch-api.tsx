import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "API Reference",
  title: "branch()",
  lead: "Routes execution to exactly one of several agents, based on a key returned by the upstream agent.",
  toc: ["Signature", "Parameters", "Routing key", "Examples"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>def</span> <span className={styles.fn}>branch</span>({"\n"}    default: <span className={styles.cls}>Agent</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    <span className={styles.op}>**</span>routes: <span className={styles.cls}>Agent</span>,{"\n"}) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>BranchAgent</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>default</td><td>Agent | None</td><td>None</td><td>Runs when the routing key matches none of the named routes. If None, an unmatched key raises <code className={styles.code}>BranchError</code>.</td></tr>
          <tr><td>**routes</td><td>Agent</td><td>required</td><td>Maps a routing key (string) to the agent that should handle it.</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="routing-key">Routing key</h2>
      <p className={styles["doc-p"]}>
        The upstream agent decides the route. If its output is a{" "}
        <code className={styles.code}>dict</code>, n00dles looks for a{" "}
        <code className={styles.code}>category</code>{" "}
        key by convention; if its output is a plain <code className={styles.code}>str</code>,
        the string itself is the key:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>classifier</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Classify the ticket. Return &#123;category, confidence&#125;.&quot;&quot;&quot;</span>{"\n"}    <span className={styles.cm}># category must be one of the route keys below, e.g. &quot;billing&quot; or &quot;support&quot;</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, branch, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>handle_support</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Handle customer support inquiry.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o-mini&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>handle_billing</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Handle billing and payment inquiry.&quot;&quot;&quot;</span>{"\n\n"}triage <span className={styles.op}>=</span> pipeline({"\n"}    classifier <span className={styles.op}>&gt;&gt;</span> branch({"\n"}        support<span className={styles.op}>=</span>handle_support,{"\n"}        billing<span className={styles.op}>=</span>handle_billing,{"\n"}        default<span className={styles.op}>=</span>handle_support,{"\n"}    ),{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>2</span>,{"\n"}){"\n"}result <span className={styles.op}>=</span> run(triage, ticket<span className={styles.op}>=</span><span className={styles.str}>&quot;My invoice is wrong&quot;</span>)</pre>
      </div>
    </>
  );
}
