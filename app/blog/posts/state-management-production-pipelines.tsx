import Link from "next/link";
import type { BlogBodyProps, BlogMeta } from "./types";

export const meta: BlogMeta = {
  slug: "state-management-production-pipelines",
  tag: "Production",
  title: "State management in production LLM pipelines",
  excerpt:
    "Checkpointing, distributed locks, crash recovery, and why your in-memory state store will eventually betray you.",
  author: { name: "Udon Price", role: "Lead Infrastructure Engineer", initials: "UP" },
  date: "May 22, 2026",
  readTime: "11 min",
};

export function Body({ styles }: BlogBodyProps) {
  return (
    <>
      <p className={styles["doc-p"]}>
        I own everything that has to keep running when nobody&apos;s watching it: the state
        store, the worker pool, the deploy tooling, the monitoring stack. If you want to find
        the part of a system that&apos;s lying about how reliable it is, look at how it handles
        state across a crash. Almost everything else in a pipeline is forgiving of small bugs.
        State is not — it&apos;s the one place where &quot;mostly correct&quot; is functionally
        identical to &quot;wrong,&quot; because the failure only shows up under exactly the
        conditions you didn&apos;t test for.
      </p>

      <h2 className={styles["doc-h2"]} id="why-in-memory-fails">Why in-memory state always eventually fails</h2>
      <p className={styles["doc-p"]}>
        Every in-memory state store works perfectly in development. That&apos;s the trap. A
        dictionary that tracks &quot;which steps have completed and what they returned&quot;
        is simple, fast, and has zero infrastructure dependencies — which means it&apos;s also
        the thing every tutorial uses, and the thing every team initially ships to production
        without thinking too hard about it.
      </p>
      <p className={styles["doc-p"]}>
        It works fine until one of three things happens: the process restarts mid-run (a deploy,
        a crash, an autoscaler killing an idle worker), the pipeline genuinely needs more wall
        time than a single request-response cycle allows, or you scale past one worker process
        and discover that two requests for the &quot;same&quot; pipeline run aren&apos;t actually
        looking at the same memory. None of these are exotic. They&apos;re Tuesday.
      </p>

      <h2 className={styles["doc-h2"]} id="what-checkpointing-means">What checkpointing actually means here</h2>
      <p className={styles["doc-p"]}>
        In n00dles, a pipeline run is backed by a <code className={styles.code}>PipelineContext</code>{" "}
        — the original inputs, plus a growing record of every completed node&apos;s output, keyed
        by node name. After every single node finishes, not just at the end of the run, that
        context gets serialized and written to the configured state store under the run&apos;s
        ID. This isn&apos;t an opt-in feature you enable for &quot;important&quot; pipelines.
        It happens by default, for every run, because the moment checkpointing becomes optional
        is the moment someone forgets to opt in on the pipeline that turns out to matter most.
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run{"\n\n"}content_pipeline <span className={styles.op}>=</span> pipeline(researcher <span className={styles.op}>&gt;&gt;</span> writer <span className={styles.op}>&gt;&gt;</span> editor){"\n"}result <span className={styles.op}>=</span> run(content_pipeline, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;agentic search&quot;</span>){"\n\n"}<span className={styles.cm}># every result carries the run_id it was checkpointed under</span>{"\n"}<span className={styles.kw}>print</span>(result.run_id)</pre>
      </div>
      <p className={styles["doc-p"]}>
        If that process dies after <code className={styles.code}>researcher</code> and{" "}
        <code className={styles.code}>writer</code> have already succeeded but before{" "}
        <code className={styles.code}>editor</code> finishes, resuming with that same{" "}
        <code className={styles.code}>run_id</code> doesn&apos;t replay the whole pipeline. The
        executor checks each node against the saved context first — <code className={styles.code}>researcher</code>{" "}
        and <code className={styles.code}>writer</code>&apos;s outputs are already there, so only{" "}
        <code className={styles.code}>editor</code> actually calls an LLM. You don&apos;t pay
        twice, and you don&apos;t wait twice, for work that already finished.
      </p>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>
          This applies to <code className={styles.code}>parallel()</code> groups too, member by
          member — if two of three fanned-out agents already succeeded before a crash, resuming
          only re-runs the one that didn&apos;t.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="serialization">The unglamorous part: serialization</h2>
      <p className={styles["doc-p"]}>
        Most of the actual engineering effort in a state layer isn&apos;t the happy path — it&apos;s
        getting serialization right for every shape of output an agent can return. n00dles agents
        can return plain strings, or they can return Pydantic models when you want validated,
        structured output. A checkpoint has to handle both, and it has to handle the second case
        without quietly losing data or — worse — silently coercing a typed object into something
        that looks fine in a log line but breaks the moment a downstream node tries to read a
        field off it.
      </p>
      <p className={styles["doc-p"]}>
        We serialize through a single explicit path: Pydantic models get{" "}
        <code className={styles.code}>model_dump(mode=&quot;json&quot;)</code>, everything else
        falls through to standard JSON encoding. One honest caveat worth stating plainly because
        we&apos;d rather you hear it from us than discover it the hard way: a restored checkpoint
        comes back as a plain <code className={styles.code}>dict</code>, not the original model
        class. There&apos;s no per-node type registry that reconstructs the exact Pydantic type
        on resume. If a downstream node&apos;s contract expects the original model and not a
        dict, that&apos;s worth testing explicitly in your resume path today.
      </p>

      <h2 className={styles["doc-h2"]} id="backends">Picking a backend</h2>
      <p className={styles["doc-p"]}>
        The default backend is SQLite, and we mean that as a real recommendation, not a
        placeholder until you &quot;graduate&quot; to something else. For local development and
        single-node deployments — which covers a large share of real production multi-agent
        pipelines, not just toy projects — a file-based store with zero configuration and zero
        external dependencies is exactly the right amount of infrastructure. You don&apos;t need
        to stand up a database cluster to get crash-safe checkpointing.
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> configure{"\n\n"}configure(state_store<span className={styles.op}>=</span><span className={styles.str}>&quot;sqlite:///n00dles.db&quot;</span>) <span className={styles.cm}># default path: ./n00dles_state.db</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        There&apos;s also an <code className={styles.code}>InMemoryStateStore</code>, which exists
        specifically for tests — fast, no file I/O, wiped clean between test runs. Both implement
        the same minimal <code className={styles.code}>StateStore</code> interface:{" "}
        <code className={styles.code}>load_or_create</code>, <code className={styles.code}>save</code>,{" "}
        and <code className={styles.code}>delete</code>. That interface is intentionally small,
        because the smaller the contract, the easier it is to implement correctly against a new
        backend later.
      </p>

      <h2 className={styles["doc-h2"]} id="honest-gap">Where we are, honestly</h2>
      <p className={styles["doc-p"]}>
        I&apos;d rather tell you what&apos;s actually true than let the roadmap slide read like a
        feature list. Today, the shipped backends are SQLite and the in-memory test store. A
        shared backend for horizontally-scaled, multi-worker deployments — the kind backed by
        Redis or Postgres, where any worker can pick up any run — is on the roadmap and described
        in the docs, but it isn&apos;t in your hands yet.
      </p>
      <div className={`${styles.callout} ${styles.soon}`}>
        <span className={styles["callout-icon"]}>🔜</span>
        <div>
          If you&apos;re running multiple workers today, the practical workaround is to pin a
          given run to the worker that started it (sticky routing by{" "}
          <code className={styles.code}>run_id</code>) or to point every worker&apos;s SQLite
          path at the same network-attached file — workable for moderate scale, not a long-term
          answer for high-throughput horizontal scaling. The distributed backend is what fixes
          that properly, and it&apos;s next on our list specifically because of how many people
          have asked for it.
        </div>
      </div>
      <p className={styles["doc-p"]}>
        We&apos;d rather ship that backend once, correctly, with the same checkpoint-every-node
        guarantee the SQLite store already gives you, than ship something fast that quietly
        weakens the one promise this whole layer exists to keep. See the{" "}
        <Link href="/docs#state" style={{ color: "var(--yellow)" }}>state management docs</Link> for the current backend table and what&apos;s
        coming next.
      </p>
    </>
  );
}
