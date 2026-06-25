import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Guides",
  title: "Production Deploy",
  lead: "Ship a pipeline as a live HTTP endpoint with one CLI command — no Dockerfile or infra config required to get started.",
  toc: ["The deploy CLI", "Deployment targets", "Environment & secrets", "Rollbacks"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <div className={`${styles.callout} ${styles.soon}`}>
        <span className={styles["callout-icon"]}>🔜</span>
        <div>
          <strong>Coming soon.</strong> The <code className={styles.code}>noodles</code> CLI
          isn&apos;t in the current release yet — everything below describes the planned
          design. Today, ship a pipeline by deploying your own Python process (Docker, a
          serverless function, a long-running worker) and calling <code className={styles.code}>run()</code> /{" "}
          <code className={styles.code}>arun()</code> directly.
        </div>
      </div>

      <h2 className={styles["doc-h2"]} id="cli">The deploy CLI</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>noodles deploy pipeline.py --name content-pipeline{"\n"}<span className={styles.cm}># → builds a container, ships it, and gives you a live URL</span>{"\n"}<span className={styles.cm}># → https://run.n00dles.io/your-org/content-pipeline</span></pre>
      </div>
      <p className={styles["doc-p"]}>
        The deployed endpoint accepts a POST request with your pipeline&apos;s input arguments as
        JSON, and returns the <code className={styles.code}>RunResult</code>{" "}
        serialized the same way:
      </p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>curl -X POST https://run.n00dles.io/your-org/content-pipeline {"\\"}{"\n"}  -H <span className={styles.str}>&quot;Content-Type: application/json&quot;</span> {"\\"}{"\n"}  -d <span className={styles.str}>&apos;&#123;&quot;topic&quot;: &quot;Banking 5.0&quot;&#125;&apos;</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="targets">Deployment targets</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Target</th><th>Flag</th><th>Good for</th></tr>
        </thead>
        <tbody>
          <tr><td>n00dles Cloud</td><td><code className={styles.code}>(default)</code></td><td>Zero-config, managed, on Pro/Team plans</td></tr>
          <tr><td>AWS Lambda</td><td><code className={styles.code}>--target lambda</code></td><td>Sporadic traffic, pay-per-invocation</td></tr>
          <tr><td>Docker</td><td><code className={styles.code}>--target docker</code></td><td>Self-hosting on your own infra / K8s</td></tr>
          <tr><td>Fly.io / Railway</td><td><code className={styles.code}>--target flyio</code></td><td>Always-on workers, simple ops</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="env-secrets">Environment &amp; secrets</h2>
      <p className={styles["doc-p"]}>Secrets in your local <code className={styles.code}>.env</code> aren&apos;t uploaded automatically — push them explicitly so they end up in the deploy target&apos;s secret store, not in a build artifact:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>noodles secrets push --env .env --name content-pipeline</pre>
      </div>
      <div className={`${styles.callout} ${styles.warn}`}>
        <span className={styles["callout-icon"]}>⚠</span>
        <div><code className={styles.code}>noodles deploy</code> never reads or uploads <code className={styles.code}>.env</code> on its own — secrets are a separate, explicit step on purpose.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="rollbacks">Rollbacks</h2>
      <p className={styles["doc-p"]}>Every deploy is versioned. Roll back instantly if a deploy misbehaves:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>noodles deploy list --name content-pipeline{"\n"}noodles deploy rollback --name content-pipeline --version 12</pre>
      </div>
    </>
  );
}
