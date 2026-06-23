import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Core Concepts",
  title: "State Management",
  lead: "n00dles checkpoints pipeline state after every agent, so a crash, restart, or deploy never loses progress mid-pipeline.",
  toc: ["How checkpointing works", "Choosing a backend", "Resuming a crashed pipeline"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="how-it-works">How checkpointing works</h2>
      <p className={styles["doc-p"]}>
        Every time an agent in a running pipeline completes, n00dles writes a checkpoint — the
        run ID, which step finished, and that step&apos;s output — to the configured state store.
        If the process dies before the next agent finishes, the pipeline resumes from the last
        checkpoint instead of from the start.
      </p>
      <ul className={styles["doc-ul"]}>
        <li>Checkpoints are written synchronously before the next agent is dispatched</li>
        <li>Each checkpoint is keyed by <code className={styles.code}>run_id</code>, so concurrent runs of the same pipeline never collide</li>
        <li>Completed runs are retained for 30 days by default (configurable) for replay and debugging</li>
      </ul>

      <h2 className={styles["doc-h2"]} id="backend">Choosing a backend</h2>
      <p className={styles["doc-p"]}>Set the backend once, globally, via <code className={styles.code}>configure()</code>:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> configure{"\n\n"}<span className={styles.cm}># SQLite — good default for local dev &amp; single-node deploys</span>{"\n"}configure(state_store<span className={styles.op}>=</span><span className={styles.str}>&quot;sqlite:///n00dles.db&quot;</span>){"\n\n"}<span className={styles.cm}># Redis — for multi-worker / horizontally scaled deploys</span>{"\n"}configure(state_store<span className={styles.op}>=</span><span className={styles.str}>&quot;redis://localhost:6379/0&quot;</span>)</pre>
      </div>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Backend</th><th>Good for</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>sqlite://</td><td>Local dev, single-node, low volume</td><td>Zero setup, file-based, ships by default</td></tr>
          <tr><td>redis://</td><td>Multi-worker, horizontally scaled</td><td>Shared state across processes/machines</td></tr>
          <tr><td>postgres://</td><td>Long-term retention, audit requirements</td><td>Available on Team/Enterprise plans</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="resuming">Resuming a crashed pipeline</h2>
      <p className={styles["doc-p"]}>If you know a run was interrupted, resume it explicitly by ID:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> resume{"\n\n"}result <span className={styles.op}>=</span> resume(run_id<span className={styles.op}>=</span><span className={styles.str}>&quot;run_8f2a1c&quot;</span>){"\n"}<span className={styles.cm}># picks up after the last completed agent — already-finished steps aren&apos;t re-run</span></pre>
      </div>
      <div className={`${styles.callout} ${styles.warn}`}>
        <span className={styles["callout-icon"]}>⚠</span>
        <div>Resume re-executes the in-flight agent from scratch — write agents to be idempotent if your pipeline does anything with side effects (sending emails, writing to a database).</div>
      </div>
    </>
  );
}
