import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Core Concepts",
  title: "Agents",
  lead: "An agent is an LLM-backed function with typed inputs and outputs. In n00dles, you define one by decorating any Python function with @agent.",
  toc: ["Defining an agent", "How it works", "Output types", "Overriding the prompt"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="defining">Defining an agent</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>summarizer</span>(text: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Summarize the given text in three concise sentences.&quot;&quot;&quot;</span></pre>
      </div>
      <p className={styles["doc-p"]}>The function&apos;s <strong>docstring</strong> becomes the system prompt. The <strong>type annotations</strong> define the contract — n00dles validates input and output against them automatically.</p>

      <h2 className={styles["doc-h2"]} id="how-it-works">How it works</h2>
      <p className={styles["doc-p"]}>When you call an agent, n00dles:</p>
      <ul className={styles["doc-ul"]}>
        <li>Validates the input against the type annotations</li>
        <li>Constructs a prompt from the docstring + serialized input</li>
        <li>Calls the specified LLM with retry + timeout logic</li>
        <li>Parses and validates the typed output</li>
        <li>Emits a structured trace event</li>
      </ul>

      <h2 className={styles["doc-h2"]} id="output-types">Output types</h2>
      <p className={styles["doc-p"]}>Agents support all standard Python types as outputs. For structured data, use Pydantic models:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>pydantic</span> <span className={styles.kw}>import</span> BaseModel{"\n"}<span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent{"\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>Sentiment</span>(BaseModel):{"\n"}    label: <span className={styles.cls}>str</span>       <span className={styles.cm}># &quot;positive&quot; | &quot;negative&quot; | &quot;neutral&quot;</span>{"\n"}    confidence: <span className={styles.cls}>float</span>  <span className={styles.cm}># 0.0 – 1.0</span>{"\n"}    summary: <span className={styles.cls}>str</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>analyze_sentiment</span>(review: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>Sentiment</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Analyze the sentiment of the product review.&quot;&quot;&quot;</span>{"\n\n"}result <span className={styles.op}>=</span> analyze_sentiment(<span className={styles.str}>&quot;Absolutely love this product!&quot;</span>){"\n"}<span className={styles.fn}>print</span>(result.label)       <span className={styles.cm}># → &quot;positive&quot;</span>{"\n"}<span className={styles.fn}>print</span>(result.confidence)  <span className={styles.cm}># → 0.97</span></pre>
      </div>

      <h2 className={styles["doc-h2"]} id="override-prompt">Overriding the prompt</h2>
      <p className={styles["doc-p"]}>Use the <code className={styles.code}>prompt</code> parameter to supply a system prompt explicitly, independent of the docstring:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>@agent</span>({"\n"}    model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>,{"\n"}    prompt<span className={styles.op}>=</span><span className={styles.str}>&quot;&quot;&quot;You are a financial analyst specializing in tech sector equities.{"\n"}Provide structured analysis with explicit uncertainty estimates.&quot;&quot;&quot;</span>{"\n"}){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>equity_analyst</span>(ticker: <span className={styles.cls}>str</span>, context: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Analyze the equity.&quot;&quot;&quot;</span></pre>
      </div>
    </>
  );
}
