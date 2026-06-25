import Link from "next/link";
import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Getting Started",
  title: "Quick Start",
  lead: "The condensed, copy-paste version. Want the guided, step-by-step walkthrough instead? Head to the interactive Quickstart.",
  toc: ["The five-minute version", "What just happened", "Guided version"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="five-minute">The five-minute version</h2>
      <p className={styles["doc-p"]}>Install, set a key, define three agents, chain them, run. That&apos;s the whole thing:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>pip install get-n00dles{"\n"}export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;</pre>
      </div>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — pipeline.py</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the topic. Return 3 key facts.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a 200-word article from the research.&quot;&quot;&quot;</span>{"\n\n"}content_pipeline <span className={styles.op}>=</span> pipeline(researcher <span className={styles.op}>&gt;&gt;</span> writer, retry<span className={styles.op}>=</span><span className={styles.num}>3</span>){"\n"}result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;the future of multi-agent AI&quot;</span>){"\n"}<span className={styles.fn}>print</span>(result.output)</pre>
      </div>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>python pipeline.py</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="what-happened">What just happened</h2>
      <ul className={styles["doc-ul"]}>
        <li><code className={styles.code}>researcher</code> ran first, hit Claude Haiku, returned a plain string</li>
        <li>n00dles passed that string straight into <code className={styles.code}>writer</code> as <code className={styles.code}>research</code></li>
        <li>The whole thing retried up to 3× on transient failures, with no extra code from you</li>
        <li>A trace event was recorded for each agent call — visible in the dashboard if you&apos;re on managed cloud</li>
      </ul>

      <h2 className={styles["doc-h2"]} id="guided">Want the guided version?</h2>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>The interactive <Link href="/quickstart" style={{ color: "var(--yellow)" }}>Quickstart walkthrough</Link> covers the same ground with explanations at each step, a progress tracker, and copy buttons for every command. Good if this is your first time with n00dles.</div>
      </div>
    </>
  );
}
