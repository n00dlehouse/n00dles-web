import Link from "next/link";
import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "parallel-agents-one-line",
  tag: "Engineering",
  title: "Parallel agents with one line of code",
  excerpt:
    "Most LLM pipelines are embarrassingly sequential. Here's how n00dles' parallel() primitive works under the hood.",
  author: { name: "Soba Chen", role: "Backend Engineer", initials: "SC" },
  date: "May 31, 2026",
  readTime: "6 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        I own the pipeline executor — the loop that turns your agent chain into actual LLM calls,
        in the right order, with the right state. For a long time, &quot;right order&quot; meant
        exactly one thing: one after another. And for a surprisingly long time, that was fine,
        because almost every pipeline we wrote internally genuinely was sequential — research
        feeds into a draft, a draft feeds into an edit.
      </p>
      <p className={styles["doc-p"]}>
        Then we built a research pipeline that scraped both the web and academic papers before
        synthesizing them, and I watched it sit there for nine seconds waiting on two HTTP calls
        that had absolutely nothing to do with each other. That&apos;s when it became obvious:
        most multi-agent pipelines aren&apos;t sequential by necessity. They&apos;re sequential
        because sequential is what <code className={styles.code}>&gt;&gt;</code> gives you for
        free, and nobody had bothered to give you anything else yet.
      </p>

      <h2 className={styles["doc-h2"]} id="the-shape">The shape of the problem</h2>
      <p className={styles["doc-p"]}>
        Look at almost any &quot;pipeline&quot; diagram for a multi-agent system and you&apos;ll
        usually find the same pattern hiding in it: a handful of steps that don&apos;t depend on
        each other, followed by one step that needs all of their outputs at once. Scrape news,
        scrape social, scrape forums — then merge. Run three reviewers over a draft — then pick
        the best one. Fan out, then fan in.
      </p>
      <p className={styles["doc-p"]}>
        Running that sequentially doesn&apos;t make it more correct. It just makes it slower,
        because you&apos;re paying the full latency of every independent call back-to-back
        instead of overlapping them. For LLM calls specifically, where a single call can
        reasonably take several seconds, that overhead compounds fast.
      </p>

      <h2 className={styles["doc-h2"]} id="one-line">The one line</h2>
      <p className={styles["doc-p"]}>
        So <code className={styles.code}>parallel()</code> — and its operator form,{" "}
        <code className={styles.code}>|</code> — does exactly one thing: it runs a set of agents
        concurrently instead of one after another, and merges their outputs into a dict keyed by
        each agent&apos;s function name:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_news</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Scrape latest news.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_twitter</span>(query: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Pull recent posts.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>merge_signals</span>(scrape_news: <span className={styles.cls}>str</span>, scrape_twitter: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Merge and rank both signals.&quot;&quot;&quot;</span>{"\n\n"}intel <span className={styles.op}>=</span> pipeline(parallel(scrape_news, scrape_twitter) <span className={styles.op}>&gt;&gt;</span> merge_signals, timeout<span className={styles.op}>=</span><span className={styles.num}>20</span>){"\n"}result <span className={styles.op}>=</span> run(intel, query<span className={styles.op}>=</span><span className={styles.str}>&quot;AI regulation 2026&quot;</span>)</pre>
      </div>
      <p className={styles["doc-p"]}>
        Notice that <code className={styles.code}>merge_signals</code>&apos;s parameters are
        named <code className={styles.code}>scrape_news</code> and{" "}
        <code className={styles.code}>scrape_twitter</code> — exactly matching the upstream
        agents&apos; function names. That&apos;s deliberate, and it&apos;s the whole trick:
        the executor doesn&apos;t need a separate merge step, a separate key-mapping
        configuration, or a context object you have to dig values out of. It just matches
        parameter names to upstream agent names. If your downstream agent only wants some of the
        fan-out results, declare only those parameter names — n00dles passes you exactly what
        you asked for, nothing else.
      </p>

      <h2 className={styles["doc-h2"]} id="under-the-hood">Under the hood</h2>
      <p className={styles["doc-p"]}>
        There&apos;s no scheduler, no thread pool, no separate worker process. n00dles is async
        from top to bottom, so <code className={styles.code}>parallel()</code> is, structurally,
        just <code className={styles.code}>asyncio.gather()</code> over the member agents&apos;
        calls, each wrapped in the same retry, timeout, and tracing logic every other agent gets.
        That last part matters more than it sounds: a flaky member of a parallel group retries
        and falls back exactly like it would standalone — fanning out doesn&apos;t mean
        fanning out your error handling too.
      </p>
      <p className={styles["doc-p"]}>
        Each member is checkpointed under its own name as soon as it finishes, independently of
        the others. Concretely, that means if you&apos;re running{" "}
        <code className={styles.code}>parallel(a, b, c)</code> and the process crashes after{" "}
        <code className={styles.code}>a</code> and <code className={styles.code}>b</code> have
        already succeeded, resuming that run re-checks each member individually — and only{" "}
        <code className={styles.code}>c</code> actually gets re-run. You don&apos;t pay twice for
        work you already paid for once, the same principle that drove checkpoint-and-resume in
        the first place.
      </p>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>
          If you&apos;re fanning out against a rate-limited provider, pass{" "}
          <code className={styles.code}>max_concurrency</code>:{" "}
          <code className={styles.code}>parallel(*agents, max_concurrency=3)</code> caps how many
          members run at once with a semaphore, instead of firing every call simultaneously.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="the-other-half">The other half: branch()</h2>
      <p className={styles["doc-p"]}>
        Fan-out solves &quot;run all of these.&quot; The complementary problem is &quot;run
        exactly one of these, chosen at runtime&quot; — and that&apos;s what{" "}
        <code className={styles.code}>branch()</code> is for. A classifier agent returns a
        category, and <code className={styles.code}>branch()</code> routes execution to whichever
        downstream agent matches it, falling back to a default if nothing matches:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> branch{"\n\n"}triage <span className={styles.op}>=</span> pipeline(classify <span className={styles.op}>&gt;&gt;</span> branch(billing<span className={styles.op}>=</span>handle_billing, support<span className={styles.op}>=</span>handle_support, default<span className={styles.op}>=</span>handle_support))</pre>
      </div>
      <p className={styles["doc-p"]}>
        Same philosophy as <code className={styles.code}>parallel()</code>: one line, no
        separate router object to configure, reuses the exact same retry/timeout/checkpoint
        machinery underneath. We&apos;ll go deeper on routing strategies in a future post — for
        now, the{" "}
        <Link href="/docs#branch-api" style={{ color: "var(--yellow)" }}>branch() reference</Link> has the full signature and
        more examples.
      </p>

      <h2 className={styles["doc-h2"]} id="closing">Why this mattered enough to ship first</h2>
      <p className={styles["doc-p"]}>
        We could have shipped n00dles with sequential composition only and called fan-out a
        &quot;future improvement.&quot; We didn&apos;t, because in practice almost every
        pipeline past a certain complexity hits this exact wall — independent work being forced
        through a single-file queue for no reason other than the framework not offering an
        alternative. One line of code shouldn&apos;t be a stretch goal for something this
        common. See the{" "}
        <Link href="/docs#parallel-api" style={{ color: "var(--yellow)" }}>parallel() reference</Link> for the full
        signature, including how partial-resume interacts with retried members.
      </p>
    </>
  );
}
