import Link from "next/link";
import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Guides",
  title: "Observability",
  lead: "Every token, latency, and tool call is traced automatically. Export it anywhere, or view it in the hosted dashboard.",
  toc: ["Built-in trace events", "Exporting traces", "Dashboard metrics"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="trace-events">Built-in trace events</h2>
      <p className={styles["doc-p"]}>Every agent call emits a structured event with no extra code required:</p>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Field</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>agent_name</td><td>The decorated function&apos;s name</td></tr>
          <tr><td>model</td><td>Model identifier used for the call</td></tr>
          <tr><td>status</td><td>ok / retried / failed</td></tr>
          <tr><td>duration_ms</td><td>Wall-clock time for this specific call</td></tr>
          <tr><td>tokens_in / tokens_out</td><td>Token usage for this call</td></tr>
          <tr><td>tags</td><td>Tags from the agent, the pipeline, and the run, merged</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="exporting">Exporting traces</h2>
      <p className={styles["doc-p"]}>Point n00dles at any OpenTelemetry-compatible collector, or use a built-in exporter:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> configure{"\n\n"}<span className={styles.cm}># Generic OpenTelemetry — available now</span>{"\n"}configure(otel_endpoint<span className={styles.op}>=</span><span className={styles.str}>&quot;https://otel-collector.internal:4317&quot;</span>){"\n\n"}<span className={styles.cm}># Built-in exporters — coming soon</span>{"\n"}configure(trace_exporter<span className={styles.op}>=</span><span className={styles.str}>&quot;langfuse&quot;</span>, langfuse_public_key<span className={styles.op}>=</span><span className={styles.str}>&quot;...&quot;</span>){"\n"}configure(trace_exporter<span className={styles.op}>=</span><span className={styles.str}>&quot;helicone&quot;</span>, helicone_api_key<span className={styles.op}>=</span><span className={styles.str}>&quot;...&quot;</span>)</pre>
      </div>
      <div className={`${styles.callout} ${styles.soon}`}>
        <span className={styles["callout-icon"]}>🔜</span>
        <div>
          <strong>Coming soon.</strong> The dedicated Langfuse and Helicone exporters aren&apos;t in
          the current release yet. The generic OpenTelemetry exporter above is real and available
          today (<code className={styles.code}>pip install get-n00dles[otel]</code>) — point it at
          any OTel collector, including ones Langfuse/Helicone already accept.
        </div>
      </div>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>Exporters are additive — you can send to OpenTelemetry and Langfuse at the same time, or none at all and just read <code className={styles.code}>RunResult.agent_traces</code> directly.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="dashboard">Dashboard metrics</h2>
      <p className={styles["doc-p"]}>
        On managed cloud, every trace also lands in the hosted dashboard automatically — total
        runs, success rate, p50 latency, and a per-pipeline breakdown, with no exporter
        configuration needed. See it in action on the{" "}
        <Link href="/dashboard" style={{ color: "var(--yellow)" }}>dashboard preview</Link>.
      </p>
    </>
  );
}
