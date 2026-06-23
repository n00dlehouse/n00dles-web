import type { DocBodyProps, DocMeta } from "../types";

export const meta: DocMeta = {
  section: "Examples",
  title: "Support Triage",
  lead: "Classify, route, draft, and gate behind human review — handling roughly 80% of tickets automatically with full escalation logic.",
  toc: ["The pipeline", "Why it's built this way"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="pipeline">The pipeline</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — support_triage.py</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, branch, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>classify</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Classify: &#123;category: billing|technical|account|other, urgency: low|med|high&#125;&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>draft_billing_reply</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Draft a reply for a billing inquiry, citing the relevant policy.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>draft_technical_reply</span>(ticket: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Draft a reply for a technical issue, including troubleshooting steps.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>needs_human</span>(draft: <span className={styles.cls}>str</span>, urgency: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>bool</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Return True if this reply should be reviewed by a human before sending.&quot;&quot;&quot;</span>{"\n\n"}triage <span className={styles.op}>=</span> pipeline({"\n"}    classify <span className={styles.op}>&gt;&gt;</span> branch({"\n"}        billing<span className={styles.op}>=</span>draft_billing_reply,{"\n"}        technical<span className={styles.op}>=</span>draft_technical_reply,{"\n"}        default<span className={styles.op}>=</span>draft_technical_reply,{"\n"}    ),{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;support-triage&quot;</span>,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>2</span>,{"\n"}){"\n\n"}result <span className={styles.op}>=</span> run(triage, ticket<span className={styles.op}>=</span><span className={styles.str}>&quot;My subscription charged me twice this month&quot;</span>){"\n"}<span className={styles.cm}># high-urgency or needs_human=True replies route to a review queue instead of auto-sending</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="why">Why it&apos;s built this way</h2>
      <ul className={styles["doc-ul"]}>
        <li><strong>classify returns urgency alongside category</strong> — the routing decision and the escalation decision use the same upstream call, not two separate LLM round-trips</li>
        <li><strong>default=draft_technical_reply</strong> means an unrecognized category still gets a reasonable attempt instead of a hard failure</li>
        <li><strong>needs_human as a gate, not a branch</strong> — every reply gets drafted either way; the gate only decides whether a human sees it before it goes out</li>
      </ul>
    </>
  );
}
