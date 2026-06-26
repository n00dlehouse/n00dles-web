import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "deep-research-pipeline-50-lines",
  tag: "Tutorial",
  title: "Building a deep research pipeline in 50 lines",
  excerpt:
    "Web scraping, parallel analysis, synthesis, and structured output — all wired with n00dles in one afternoon.",
  author: { name: "Fettuccine Romano", role: "DevRel & Developer Advocate", initials: "FR" },
  date: "April 29, 2026",
  readTime: "14 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        I stream myself building things with n00dles every Thursday, and the single most
        requested build is some version of &quot;research assistant that doesn&apos;t just
        Google one thing and call it done.&quot; So let&apos;s build a real one: it scrapes the
        web <em>and</em> academic papers at the same time, synthesizes both into key findings,
        and writes a structured report — in well under 50 lines, no framework ceremony, and
        runnable by the time you finish reading this.
      </p>

      <h2 className={styles["doc-h2"]} id="what-were-building">What we&apos;re building</h2>
      <p className={styles["doc-p"]}>
        Four agents, three steps:
      </p>
      <ul className={styles["doc-ul"]}>
        <li><strong>scrape_web</strong> and <strong>scrape_papers</strong> run at the same time — they don&apos;t depend on each other, so there&apos;s no reason to make one wait for the other.</li>
        <li><strong>synthesize</strong> waits for both, then merges them into a short list of findings.</li>
        <li><strong>write_report</strong> takes those findings and turns them into something you&apos;d actually hand to someone.</li>
      </ul>
      <p className={styles["doc-p"]}>
        That&apos;s the entire shape of the pipeline. No orchestration framework needed beyond
        n00dles itself, no separate task queue, no glue code to keep the two scrapers in sync.

      </p>

      <h2 className={styles["doc-h2"]} id="setup">Setup</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>pip install get-n00dles{"\n"}<span className={styles.kw}>export</span> ANTHROPIC_API_KEY<span className={styles.op}>=</span><span className={styles.str}>&quot;sk-ant-...&quot;</span>{"\n"}<span className={styles.kw}>export</span> OPENAI_API_KEY<span className={styles.op}>=</span><span className={styles.str}>&quot;sk-...&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        We&apos;re mixing providers on purpose in this tutorial — GPT-4o for the web scraper,
        Claude for everything else — because n00dles wraps{" "}
        <a href="https://github.com/BerriAI/litellm">litellm</a> under the hood, and switching
        providers per agent is just a different string in the <code className={styles.code}>model=</code>{" "}
        argument. There&apos;s no reason every agent in a pipeline needs to use the same model;
        pick whichever one is actually best (or cheapest) for each specific job.
      </p>

      <h2 className={styles["doc-h2"]} id="step-1">Step 1: the two scrapers</h2>
      <p className={styles["doc-p"]}>
        Every n00dles agent is a plain Python function with a docstring and type hints — the
        docstring becomes the system prompt, the type hints become the validated I/O contract.
        No subclassing, no chain object to construct:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_web</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find and scrape the 10 most relevant recent articles on the topic.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_papers</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find the 5 most relevant academic papers on the topic.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        Both take a <code className={styles.code}>topic: str</code> and return a{" "}
        <code className={styles.code}>list</code>. n00dles instructs the model to respond in
        JSON matching that shape and validates the response before it ever reaches the next
        step — if the model returns something that doesn&apos;t parse as a list, you get a clear{" "}
        <code className={styles.code}>AgentOutputError</code> instead of a downstream agent
        silently choking on malformed input three steps later.
      </p>

      <h2 className={styles["doc-h2"]} id="step-2">Step 2: synthesize, in parallel</h2>
      <p className={styles["doc-p"]}>
        This is the part people are usually surprised is this short. To run{" "}
        <code className={styles.code}>scrape_web</code> and <code className={styles.code}>scrape_papers</code>{" "}
        at the same time instead of one after the other, wrap them in{" "}
        <code className={styles.code}>parallel()</code>:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>synthesize</span>(scrape_web: <span className={styles.cls}>list</span>, scrape_papers: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Synthesize web articles and papers into 5-8 key findings.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        Look closely at the parameter names: <code className={styles.code}>scrape_web</code> and{" "}
        <code className={styles.code}>scrape_papers</code> — exactly matching the two upstream
        agents&apos; function names. That&apos;s how <code className={styles.code}>synthesize</code>{" "}
        gets both fan-out results without any manual wiring. When you compose{" "}
        <code className={styles.code}>parallel(scrape_web, scrape_papers) &gt;&gt; synthesize</code>,
        n00dles runs both scrapers concurrently, then hands{" "}
        <code className={styles.code}>synthesize</code> a dict keyed by each one&apos;s name —
        matched automatically to its parameter names.
      </p>

      <h2 className={styles["doc-h2"]} id="step-3">Step 3: write the report</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>write_report</span>(synthesize: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a structured report with an executive summary and findings.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        Same pattern again: a single-param agent following another single-output step just
        receives that output directly — no parameter-name gymnastics needed when there&apos;s
        only one upstream node to read from.
      </p>

      <h2 className={styles["doc-h2"]} id="step-4">Step 4: wire it and run it</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre>research <span className={styles.op}>=</span> pipeline({"\n"}    parallel(scrape_web, scrape_papers) <span className={styles.op}>&gt;&gt;</span> synthesize <span className={styles.op}>&gt;&gt;</span> write_report,{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;deep-research&quot;</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>90</span>,{"\n"}){"\n\n"}result <span className={styles.op}>=</span> run(research, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;agentic AI in regulated industries&quot;</span>){"\n"}<span className={styles.kw}>print</span>(result.output)</pre>
      </div>
      <p className={styles["doc-p"]}>
        That&apos;s the whole pipeline. <code className={styles.code}>timeout=90</code> sets a
        90-second budget per node that doesn&apos;t set its own — generous enough for a scraping
        call, tight enough to fail fast if a provider hangs. Run it, and{" "}
        <code className={styles.code}>result.output</code> is the final report from{" "}
        <code className={styles.code}>write_report</code>.
      </p>

      <h2 className={styles["doc-h2"]} id="inspecting">Inspecting what actually happened</h2>
      <p className={styles["doc-p"]}>
        <code className={styles.code}>run()</code> doesn&apos;t just give you the final string —
        it gives you a <code className={styles.code}>RunResult</code> with a full trace of every
        agent call:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>print</span>(result.duration_ms)    <span className={styles.cm}># wall-clock time for the whole run</span>{"\n"}<span className={styles.kw}>print</span>(result.total_tokens)    <span className={styles.cm}># summed across every call, including retries</span>{"\n"}<span className={styles.kw}>for</span> t <span className={styles.kw}>in</span> result.agent_traces:{"\n"}    <span className={styles.kw}>print</span>(t.name, t.status, t.duration_ms, <span className={styles.str}>&quot;ms&quot;</span>)</pre>
      </div>
      <p className={styles["doc-p"]}>
        If you compare <code className={styles.code}>duration_ms</code> against the sum of{" "}
        <code className={styles.code}>scrape_web</code> and{" "}
        <code className={styles.code}>scrape_papers</code>&apos;s individual durations, you&apos;ll
        see the parallel fan-out actually paid off — the total run time tracks the slower of the
        two scrapers, not the sum of both.
      </p>

      <h2 className={styles["doc-h2"]} id="leveling-up">Leveling up: structured findings</h2>
      <p className={styles["doc-p"]}>
        Returning <code className={styles.code}>str</code> from{" "}
        <code className={styles.code}>synthesize</code> works, but if you want{" "}
        <code className={styles.code}>write_report</code> — or anything downstream — to reason
        about findings programmatically instead of re-parsing prose, swap in a Pydantic model:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>pydantic</span> <span className={styles.kw}>import</span> BaseModel{"\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Finding</span>(BaseModel):{"\n"}    claim: <span className={styles.cls}>str</span>{"\n"}    confidence: <span className={styles.cls}>float</span>{"\n"}    sources: <span className={styles.cls}>list</span>[<span className={styles.cls}>str</span>]{"\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Findings</span>(BaseModel):{"\n"}    items: <span className={styles.cls}>list</span>[Finding]{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>synthesize</span>(scrape_web: <span className={styles.cls}>list</span>, scrape_papers: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> Findings:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Synthesize web articles and papers into 5-8 key findings.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        Nothing else in the pipeline needs to change. n00dles sees the Pydantic return type,
        instructs the model to respond with matching JSON, and validates it before{" "}
        <code className={styles.code}>write_report</code> ever sees it — so by the time your
        downstream code runs, <code className={styles.code}>synthesize</code>&apos;s output is
        guaranteed to be a real <code className={styles.code}>Findings</code> object with a real{" "}
        <code className={styles.code}>list[Finding]</code>, not a string you have to hope was
        formatted correctly.
      </p>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>
          If a model&apos;s response doesn&apos;t validate against the schema, n00dles raises{" "}
          <code className={styles.code}>AgentOutputError</code> and the executor&apos;s normal
          retry policy kicks in — a malformed structured response is treated exactly like a
          retryable failure, not a silent pass-through.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="full-script">The full script</h2>
      <p className={styles["doc-p"]}>
        Here&apos;s everything together, structured output included, right at the 50-line mark
        promised in the title:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>pydantic</span> <span className={styles.kw}>import</span> BaseModel{"\n"}<span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Finding</span>(BaseModel):{"\n"}    claim: <span className={styles.cls}>str</span>{"\n"}    confidence: <span className={styles.cls}>float</span>{"\n"}    sources: <span className={styles.cls}>list</span>[<span className={styles.cls}>str</span>]{"\n\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Findings</span>(BaseModel):{"\n"}    items: <span className={styles.cls}>list</span>[Finding]{"\n\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_web</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find and scrape the 10 most relevant recent articles on the topic.&quot;&quot;&quot;</span>{"\n\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_papers</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find the 5 most relevant academic papers on the topic.&quot;&quot;&quot;</span>{"\n\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>synthesize</span>(scrape_web: <span className={styles.cls}>list</span>, scrape_papers: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> Findings:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Synthesize web articles and papers into 5-8 key findings.&quot;&quot;&quot;</span>{"\n\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>write_report</span>(synthesize: Findings) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a structured report with an executive summary and findings.&quot;&quot;&quot;</span>{"\n\n\n"}research <span className={styles.op}>=</span> pipeline({"\n"}    parallel(scrape_web, scrape_papers) <span className={styles.op}>&gt;&gt;</span> synthesize <span className={styles.op}>&gt;&gt;</span> write_report,{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;deep-research&quot;</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>90</span>,{"\n"}){"\n\n"}<span className={styles.kw}>if</span> __name__ <span className={styles.op}>==</span> <span className={styles.str}>&quot;__main__&quot;</span>:{"\n"}    result <span className={styles.op}>=</span> run(research, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;agentic AI in regulated industries&quot;</span>){"\n"}    <span className={styles.kw}>print</span>(result.output){"\n"}    <span className={styles.kw}>print</span>(<span className={styles.str}>f&quot;{"{"}result.total_tokens{"}"} tokens, {"{"}result.duration_ms:.0f{"}"}ms&quot;</span>)</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="next-steps">Where to take this next</h2>
      <p className={styles["doc-p"]}>
        A few natural next steps, all of which slot into this same structure without
        restructuring anything: add a third parallel source (forums, a Slack export, an internal
        knowledge base) by adding it to the <code className={styles.code}>parallel()</code> call
        and giving <code className={styles.code}>synthesize</code> a matching parameter name;
        add a <code className={styles.code}>fallback=</code> agent on{" "}
        <code className={styles.code}>scrape_web</code> in case one provider has a bad day; or
        route the final report through a <code className={styles.code}>branch()</code> based on
        urgency or topic category. Each of those is a one-line addition, not a restructure — which
        is, honestly, the entire point of building it this way.
      </p>
    </>
  );
}
