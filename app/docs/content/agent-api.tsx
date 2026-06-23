import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "API Reference",
  title: "@agent",
  lead: "The @agent decorator transforms any Python function into an LLM-backed agent with built-in retry, timeout, type validation, and tracing.",
  toc: ["Signature", "Parameters", "Returns", "Examples"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="signature">Signature</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.fn}>@agent</span>({"\n"}    model: <span className={styles.cls}>str</span>,{"\n"}    prompt: <span className={styles.cls}>str</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    timeout: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>60</span>,{"\n"}    retry: <span className={styles.cls}>int</span> <span className={styles.op}>=</span> <span className={styles.num}>3</span>,{"\n"}    temperature: <span className={styles.cls}>float</span> <span className={styles.op}>=</span> <span className={styles.num}>0.7</span>,{"\n"}    max_tokens: <span className={styles.cls}>int</span> <span className={styles.op}>|</span> <span className={styles.cls}>None</span> <span className={styles.op}>=</span> <span className={styles.cls}>None</span>,{"\n"}    tags: <span className={styles.cls}>list</span>[<span className={styles.cls}>str</span>] <span className={styles.op}>=</span> [],{"\n"})</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="parameters">Parameters</h2>
      <table className={styles["param-table"]}>
        <thead>
          <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>model</td><td>str</td><td>required</td><td>The LLM model identifier. e.g. &quot;claude-sonnet-4-6&quot;, &quot;gpt-4o&quot;, &quot;mistral-large&quot;.</td></tr>
          <tr><td>prompt</td><td>str | None</td><td>None</td><td>System prompt. If None, the function&apos;s docstring is used.</td></tr>
          <tr><td>timeout</td><td>int</td><td>60</td><td>Timeout in seconds per attempt. Raises TimeoutError if exceeded.</td></tr>
          <tr><td>retry</td><td>int</td><td>3</td><td>Maximum retry attempts on transient failures. Uses exponential backoff with jitter.</td></tr>
          <tr><td>temperature</td><td>float</td><td>0.7</td><td>LLM sampling temperature (0.0–2.0). Lower = more deterministic.</td></tr>
          <tr><td>max_tokens</td><td>int | None</td><td>None</td><td>Cap on output tokens. None defers to model default.</td></tr>
          <tr><td>tags</td><td>list[str]</td><td>[]</td><td>Arbitrary tags attached to trace events for filtering in the dashboard.</td></tr>
        </tbody>
      </table>

      <h2 className={styles["doc-h2"]} id="returns">Returns</h2>
      <p className={styles["doc-p"]}>The decorator returns a callable with the same signature as the decorated function. The return type is the declared return annotation, validated via Pydantic.</p>
      <div className={`${styles.callout} ${styles.warn}`}>
        <span className={styles["callout-icon"]}>⚠</span>
        <div>If the LLM output cannot be coerced into the declared return type after all retries, an <code className={styles.code}>AgentOutputError</code> is raised.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="examples">Examples</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.cm}># Minimal — model is the only required arg</span>{"\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>translator</span>(text: <span className={styles.cls}>str</span>, target_lang: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Translate the text into the target language.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.cm}># With overrides for a production-critical agent</span>{"\n"}<span className={styles.kw}>@agent</span>({"\n"}    model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>120</span>,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>5</span>,{"\n"}    temperature<span className={styles.op}>=</span><span className={styles.num}>0.2</span>,{"\n"}    tags<span className={styles.op}>=</span>[<span className={styles.str}>&quot;production&quot;</span>, <span className={styles.str}>&quot;kyc&quot;</span>]{"\n"}){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>kyc_extractor</span>(document: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>CustomerRecord</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Extract structured KYC data from the document.&quot;&quot;&quot;</span></pre>
      </div>
    </>
  );
}
