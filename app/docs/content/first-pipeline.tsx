import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Getting Started",
  title: "Your First Pipeline",
  lead: "A slower walkthrough than the quick start — building a small research-to-article pipeline from nothing, explaining each piece as we go.",
  toc: ["The scenario", "Step 1: define the agents", "Step 2: wire the pipeline", "Step 3: run it"],
};

export function Body({ styles, goTo }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="scenario">The scenario</h2>
      <p className={styles["doc-p"]}>
        Say you want to turn a topic into a short, edited article: research it, write a draft,
        then polish the draft. That&apos;s three distinct jobs, each suited to a different model
        — a cheap model for research, a capable one for writing, a cheap one again for editing.
        That&apos;s exactly the shape n00dles is built for.
      </p>

      <h2 className={styles["doc-h2"]} id="step-1">Step 1: define the agents</h2>
      <p className={styles["doc-p"]}>Each agent is a function. The docstring is the prompt, the signature is the contract:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the topic. Return 3-5 key facts as bullet points.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a 250-word article based on the research.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>editor</span>(draft: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Tighten the prose. Fix any awkward phrasing. Keep the meaning intact.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>Notice each function takes the previous one&apos;s output type as its input type — that&apos;s what makes the next step work.</p>

      <h2 className={styles["doc-h2"]} id="step-2">Step 2: wire the pipeline</h2>
      <p className={styles["doc-p"]}>The <code className={styles.code}>&gt;&gt;</code> operator chains agents sequentially. Wrap the chain in <code className={styles.code}>pipeline()</code> to attach retry and timeout behavior to the whole thing:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>content_pipeline <span className={styles.op}>=</span> pipeline({"\n"}    researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>3</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>60</span>,{"\n"})</pre>
      </div>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>The <code className={styles.code}>retry</code>/<code className={styles.code}>timeout</code> on <code className={styles.code}>pipeline()</code> apply per-agent, not to the pipeline as a whole — if <code className={styles.code}>writer</code> fails, only <code className={styles.code}>writer</code> retries, not the entire chain from the start.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="step-3">Step 3: run it</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;why distributed tracing matters&quot;</span>){"\n\n"}<span className={styles.fn}>print</span>(result.output){"\n"}<span className={styles.fn}>print</span>(<span className={styles.str}>f&quot;&#123;result.duration_ms&#125;ms, &#123;result.total_tokens&#125; tokens, &#123;len(result.agent_traces)&#125; agent calls&quot;</span>)</pre>
      </div>
      <p className={styles["doc-p"]}>
        <code className={styles.code}>run()</code> executes the pipeline, returns a{" "}
        <code className={styles.code}>RunResult</code>{" "}
        with the final output plus everything you need for debugging — duration, token usage,
        and a per-agent trace. From here, the natural next steps are running independent agents
        in{" "}
        <span onClick={() => goTo("parallel-api")} style={{ color: "var(--yellow)", cursor: "pointer" }}>parallel</span>, or routing between agents
        with <span onClick={() => goTo("branch-api")} style={{ color: "var(--yellow)", cursor: "pointer" }}>branch()</span> — both covered in the API reference.
      </p>
    </>
  );
}
