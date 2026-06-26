import Link from "next/link";
import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "why-we-built-n00dles",
  tag: "Origin story",
  title: "Why we built n00dles from scratch instead of patching LangChain",
  excerpt:
    "Six months, 4,000 lines of boilerplate, and one 2am incident later — we decided the existing options weren't good enough. Here's the full story.",
  author: { name: "Ramen Dass", role: "CTO & Co-founder", initials: "RD" },
  date: "June 18, 2026",
  readTime: "9 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        I built my first LLM wrapper in 2022. I built my second in early 2023. I threw both away,
        and for a long time I assumed that meant the problem was my code. It took a 2am page, a
        production pipeline silently losing $40 of API spend on calls it had already made, and
        about four hours of staring at a stack trace at my kitchen table to realize the problem
        wasn&apos;t my code at all. It was the shape of every framework I&apos;d tried to build
        on top of.
      </p>

      <h2 className={styles["doc-h2"]} id="the-setup">The setup</h2>
      <p className={styles["doc-p"]}>
        The pipeline in question was simple on paper: scrape a handful of sources, run three
        analysis agents over the results, merge their output, and write a summary. We&apos;d
        built it on top of a popular chaining framework, the way most teams do — not because we
        loved its abstractions, but because hand-rolling retry logic and prompt templating for
        the tenth time felt like reinventing a wheel that surely somebody else had already built
        correctly.
      </p>
      <p className={styles["doc-p"]}>
        Six months in, our chain definition file was 4,000 lines long. Not because the pipeline
        had gotten more complex — it hadn&apos;t, really — but because every edge case we hit
        got patched the same way: a callback here, a monkey-patch there, a custom subclass to
        work around a method that didn&apos;t quite do what we needed. We had retry logic in
        three different places, two of which disagreed with each other about what counted as a
        retryable error. We had a state-tracking dictionary that one engineer affectionately
        (and accurately) called &quot;the haunted house,&quot; because nobody wanted to go in
        there alone.
      </p>

      <h2 className={styles["doc-h2"]} id="the-incident">The incident</h2>
      <p className={styles["doc-p"]}>
        Here&apos;s what happened. A pipeline run hit a rate limit on the fourth of five agent
        calls. Our retry wrapper caught it, waited, and retried — correctly. But the
        framework&apos;s internal state object didn&apos;t persist anywhere durable between
        steps; it lived in process memory, scoped to the request. When the retry triggered a
        redeploy race (unrelated, just bad timing — a routine deploy happened to land mid-run),
        the process restarted. The first three agent calls, the ones that had already
        succeeded and already cost real money, were gone. No checkpoint. No record. The
        retry-on-restart logic, not knowing any better, started the whole pipeline over from
        agent one.
      </p>
      <div className={`${styles.callout} ${styles.warn}`}>
        <span className={styles["callout-icon"]}>⚠</span>
        <div>
          The actual dollar cost was small. The actual lesson was not: a framework that can&apos;t
          tell you what already happened isn&apos;t safe to retry anything in. Retrying
          blindly is just a more expensive way of being wrong.
        </div>
      </div>
      <p className={styles["doc-p"]}>
        I got paged at 2am because the pipeline that fed our morning report had silently
        doubled its token spend and still hadn&apos;t produced output by the time someone
        needed it. I fixed the immediate bug in about twenty minutes. I spent the rest of the
        night unable to stop thinking about how many other places in that 4,000-line file had
        the exact same shape of bug, just waiting for the right race condition to find them.
      </p>

      <h2 className={styles["doc-h2"]} id="the-diagnosis">The actual diagnosis</h2>
      <p className={styles["doc-p"]}>
        It would have been easy to conclude &quot;we wrote bad code&quot; and move on. We
        didn&apos;t, because the bug wasn&apos;t really in our code — it was in the gap between
        what the framework assumed and what production actually requires. Three assumptions, in
        particular, kept causing us trouble:
      </p>
      <ul className={styles["doc-ul"]}>
        <li>
          <strong>State was optional, not structural.</strong> Checkpointing was something you
          could bolt on if you remembered to, not something the framework did for you by
          default. We remembered to in some places and not others — predictably.
        </li>
        <li>
          <strong>Retry was a wrapper, not a contract.</strong> Every agent call needed its own
          retry logic added by hand, which meant every agent call could silently have slightly
          different (or absent) retry semantics depending on who wrote it and when.
        </li>
        <li>
          <strong>The I/O contract lived in nobody&apos;s head but the original author&apos;s.</strong>{" "}
          What shape of data did agent three expect? You found out by reading three other files
          and one Slack thread, or by running it and seeing what broke.
        </li>
      </ul>
      <p className={styles["doc-p"]}>
        None of these are exotic problems. They&apos;re the same three problems every team
        building multi-agent systems eventually runs into, which is exactly why we decided the
        fix needed to be structural, not another patch.
      </p>

      <h2 className={styles["doc-h2"]} id="starting-over">Starting over, on purpose</h2>
      <p className={styles["doc-p"]}>
        We didn&apos;t rewrite from scratch out of pride. We rewrote because every attempt to fix
        the underlying issues inside the existing framework meant fighting its abstractions, not
        using them. So we wrote down three rules before writing a single line of the new core,
        and we&apos;ve tried to break none of them since:
      </p>
      <ol className={styles["doc-ul"]} style={{ listStyle: "decimal", paddingLeft: 20 }}>
        <li>State is checkpointed after every step, by default, with no configuration required.</li>
        <li>Retry, timeout, and fallback are properties of the agent definition, not something glued on afterward.</li>
        <li>The I/O contract is the function signature. If you can read the type hints, you know what the agent expects and returns — full stop.</li>
      </ol>
      <p className={styles["doc-p"]}>
        That third rule turned out to be the one that shaped everything else. We landed on a
        single decorator, <code className={styles.code}>@agent</code>, where the docstring
        becomes the system prompt and the type hints become the validated contract:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>researcher</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the topic. Return 3 key facts.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>writer</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a short article from the research.&quot;&quot;&quot;</span>{"\n\n"}content_pipeline <span className={styles.op}>=</span> pipeline(researcher <span className={styles.op}>&gt;&gt;</span> writer, retry<span className={styles.op}>=</span><span className={styles.num}>3</span>){"\n"}result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;multi-agent orchestration&quot;</span>)</pre>
      </div>
      <p className={styles["doc-p"]}>
        No callback registry. No subclassing. No chain-of-handlers you have to trace through to
        find out what actually runs. <code className={styles.code}>researcher</code>{" "}
        and <code className={styles.code}>writer</code> are just functions with a contract — and
        the executor that runs them checkpoints state after each one finishes, with no extra
        configuration, because that&apos;s not an advanced feature. It&apos;s the floor.
      </p>

      <h2 className={styles["doc-h2"]} id="what-changed">What that actually changed</h2>
      <p className={styles["doc-p"]}>
        The same class of incident that paged me at 2am simply can&apos;t happen the same way in
        n00dles. If a node fails after exhausting its retry budget, the pipeline raises a{" "}
        <code className={styles.code}>PipelineFailure</code> that tells you exactly which node
        failed and why — and every node before it is already checkpointed, so re-running the
        same <code className={styles.code}>run_id</code> resumes from where it actually stopped,
        instead of replaying calls you already paid for.
      </p>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>
          This isn&apos;t a hypothetical improvement — it&apos;s the literal fix for the bug that
          started this whole rewrite. Checkpoint-and-resume was the first thing we built, before
          we built parallel execution, before we built provider abstraction, before anything
          else.
        </div>
      </div>
      <p className={styles["doc-p"]}>
        We also made one structural bet that&apos;s easy to miss: n00dles doesn&apos;t maintain
        five parallel provider SDKs internally. It wraps{" "}
        <a href="https://github.com/BerriAI/litellm">litellm</a>, so switching from Claude to
        GPT-4o to a local Ollama model is a string change, not a rewrite. We didn&apos;t want to
        be in the business of re-implementing every provider&apos;s SDK quirks — we wanted to be
        in the business of making the orchestration layer boring and predictable, which meant
        outsourcing the part that wasn&apos;t our problem to solve.
      </p>

      <h2 className={styles["doc-h2"]} id="open-source">Why open source it</h2>
      <p className={styles["doc-p"]}>
        We used n00dles internally for two production deployments before we open-sourced it, and
        in both cases the bug class that paged me that night simply stopped showing up. Not
        because we got better at writing careful code — because the framework made the careless
        version of the code impossible to write by accident.
      </p>
      <p className={styles["doc-p"]}>
        That&apos;s the part that convinced us to ship this publicly instead of keeping it as an
        internal tool. The problem we hit wasn&apos;t specific to our pipeline, our company, or
        our bad luck with timing. It&apos;s the default failure mode of building multi-agent
        systems on frameworks that treat reliability as an extension, not a foundation. If
        you&apos;ve had your own version of that 2am page, we&apos;d like n00dles to be the
        reason you don&apos;t get a second one.
      </p>
      <p className={styles["doc-p"]}>
        If you want to see exactly what that looks like in practice, the{" "}
        <Link href="/quickstart" style={{ color: "var(--yellow)" }}>five-minute quickstart</Link> walks through the same{" "}
        <code className={styles.code}>@agent</code> →{" "}
        <code className={styles.code}>pipeline()</code> → <code className={styles.code}>run()</code>{" "}
        flow shown above, end to end, against a real model.
      </p>
    </>
  );
}
