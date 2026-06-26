import Link from "next/link";
import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "how-we-think-about-retries",
  tag: "Deep dive",
  title: "How we think about retries in multi-agent systems",
  excerpt:
    "Not all failures are equal. Transient errors, rate limits, semantic failures, and timeouts each need their own strategy.",
  author: { name: "Pad Thai-ler", role: "Senior ML Engineer", initials: "PT" },
  date: "April 14, 2026",
  readTime: "8 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        I spent four years of a PhD making large models do small things correctly, which mostly
        meant getting very familiar with every way a model call can fail. The thing that surprised
        me moving from research into building a production framework is how often
        &quot;retry logic&quot; gets treated as a single, undifferentiated feature — as if every
        failure deserves the same response. It doesn&apos;t, and treating them the same wastes
        money, time, or both.
      </p>

      <h2 className={styles["doc-h2"]} id="four-kinds">Four kinds of failure, four different shapes</h2>
      <p className={styles["doc-p"]}>
        Strip away the specific error message and almost every LLM call failure falls into one
        of four buckets:
      </p>
      <ul className={styles["doc-ul"]}>
        <li>
          <strong>Transient errors.</strong> A dropped connection, a 503, a provider having a bad
          thirty seconds. Retrying after a short delay usually just works.
        </li>
        <li>
          <strong>Rate limits.</strong> Structurally similar to a transient error, but retrying
          immediately makes it worse, not better — you&apos;re adding load to a limit you just
          hit.
        </li>
        <li>
          <strong>Semantic failures.</strong> The call succeeded at the network layer, but the
          model&apos;s response doesn&apos;t parse, or doesn&apos;t validate against the schema
          you declared. This is a completely different failure mode from the first two — nothing
          about the network was wrong.
        </li>
        <li>
          <strong>Timeouts.</strong> The call is taking too long, for reasons that could be
          provider load, an unusually large prompt, or a model that&apos;s decided to think
          much longer than you budgeted for.
        </li>
      </ul>
      <p className={styles["doc-p"]}>
        A retry strategy that doesn&apos;t distinguish between these ends up either too
        aggressive (hammering a rate limit) or too passive (giving up on a semantic failure that
        a fresh sample would have fixed on the second try).
      </p>

      <h2 className={styles["doc-h2"]} id="exponential-backoff">Why exponential backoff with jitter, specifically</h2>
      <p className={styles["doc-p"]}>
        n00dles&apos; default retry policy is exponential backoff with jitter, configurable per
        agent:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>, retry<span className={styles.op}>=</span><span className={styles.num}>5</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>flaky_call</span>(x: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;...&quot;&quot;&quot;</span>{"\n"}<span className={styles.cm}># backoff: ~1s, ~2s, ~4s, ~8s, ~16s (± jitter), then raises</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        Exponential growth handles the rate-limit case well almost by construction — by the third
        or fourth attempt, you&apos;re waiting long enough that you&apos;re not just retrying into
        the same limit window. The jitter matters for a reason that&apos;s easy to miss if
        you&apos;re only testing with one pipeline run at a time: if a provider has a brief outage
        and a hundred of your pipeline runs all hit a transient error within the same second,
        fixed-interval backoff means all hundred retry at the exact same moment again. That&apos;s
        a self-inflicted thundering herd, aimed at a provider that&apos;s already having a bad
        time. Jitter spreads those retries out so recovery doesn&apos;t create its own spike.
      </p>

      <h2 className={styles["doc-h2"]} id="semantic-failures">Semantic failures need the same retry, a different reason</h2>
      <p className={styles["doc-p"]}>
        Here&apos;s the part that took us longest to get right. When an agent declares a
        structured return type and the model&apos;s response doesn&apos;t validate against it,
        n00dles raises <code className={styles.code}>AgentOutputError</code> — and that error
        goes through the exact same retry policy as a network failure. That&apos;s deliberate:
        LLM output is stochastic, so a response that failed to parse on one sample frequently
        succeeds on the next, for the same reason re-rolling a slightly ambiguous prompt
        sometimes just works. Treating a semantic failure as categorically different from a
        network failure would mean writing two retry code paths that do almost the same thing,
        for marginal benefit.
      </p>
      <div className={`${styles.callout} ${styles.warn}`}>
        <span className={styles["callout-icon"]}>⚠</span>
        <div>
          The exception is a prompt or schema that&apos;s fundamentally unsatisfiable — ask for a
          field the model has no way to know, or write a schema the model genuinely
          can&apos;t produce valid JSON for, and every retry fails identically. This is exactly
          why <code className={styles.code}>max_attempts</code> exists as a hard bound rather
          than retrying indefinitely: a bounded number of wasted calls, not an unbounded one.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="fallback">When retries run out: fallback agents</h2>
      <p className={styles["doc-p"]}>
        Sometimes the right answer after exhausting a retry budget isn&apos;t to fail the whole
        pipeline — it&apos;s to hand the job to a different agent. A{" "}
        <code className={styles.code}>fallback=</code> agent runs once, after the primary
        agent&apos;s retries are exhausted, and its result is checkpointed exactly like a normal
        success:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o-mini&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>cheap_backup</span>(x: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;...&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>, retry<span className={styles.op}>=</span><span className={styles.num}>3</span>, fallback<span className={styles.op}>=</span>cheap_backup){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>primary</span>(x: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;...&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        This is particularly useful when the primary failure mode is provider-specific — if
        Anthropic is having a rough afternoon, falling back to an OpenAI model for that one node
        is often a better outcome than failing the whole run and forcing a manual retry later.
      </p>

      <h2 className={styles["doc-h2"]} id="honest-gap">What retry doesn&apos;t solve, and what does</h2>
      <p className={styles["doc-p"]}>
        Retry and fallback both operate within a single run — they answer &quot;what do we do
        right now, given this call just failed.&quot; They don&apos;t answer a related but
        different question: &quot;a provider has been failing consistently for the last five
        minutes across hundreds of runs — should we stop sending it traffic at all for a while?&quot;
        That&apos;s what a circuit breaker is for, and it isn&apos;t shipped yet.
      </p>
      <div className={`${styles.callout} ${styles.soon}`}>
        <span className={styles["callout-icon"]}>🔜</span>
        <div>
          A circuit breaker is on the roadmap and described in the docs, but today,{" "}
          <code className={styles.code}>retry</code> and <code className={styles.code}>fallback=</code>{" "}
          are what&apos;s actually shipped, and they cover the large majority of real failure
          modes we&apos;ve seen — most provider issues resolve within the kind of backoff window
          retry already handles. The gap is specifically sustained outages across many
          concurrent runs, where you&apos;d rather stop calling a dead provider for thirty
          seconds than let every single run independently discover it&apos;s dead.
        </div>
      </div>
      <p className={styles["doc-p"]}>
        We&apos;d rather tell you exactly where that line is than let the roadmap blur into the
        feature list. See the{" "}
        <Link href="/docs#errors" style={{ color: "var(--yellow)" }}>error handling docs</Link> for the full
        retry/fallback reference and the current state of what&apos;s shipped versus planned.
      </p>
    </>
  );
}
