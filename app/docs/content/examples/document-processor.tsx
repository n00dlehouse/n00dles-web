import type { DocBodyProps, DocMeta } from "../types";

export const meta: DocMeta = {
  section: "Examples",
  title: "Document Processor",
  lead: "Extract structured data from PDFs and contracts at scale — n00dles handles up to 1,000 documents in parallel with full audit trails.",
  toc: ["The pipeline", "Why it's built this way"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="pipeline">The pipeline</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — document_processor.py</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>pydantic</span> <span className={styles.kw}>import</span> BaseModel{"\n"}<span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, run_batch{"\n\n"}<span className={styles.kw}>class</span> <span className={styles.cls}>InvoiceRecord</span>(BaseModel):{"\n"}    vendor: <span className={styles.cls}>str</span>{"\n"}    amount: <span className={styles.cls}>float</span>{"\n"}    due_date: <span className={styles.cls}>str</span>{"\n"}    line_items: <span className={styles.cls}>list</span>[<span className={styles.cls}>dict</span>]{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>extract</span>(document_text: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>InvoiceRecord</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Extract structured invoice data from the document.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>validate</span>(extract: <span className={styles.cls}>InvoiceRecord</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>dict</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Flag anomalies: amount mismatches, duplicate invoices, missing vendor info.&quot;&quot;&quot;</span>{"\n\n"}pipeline_def <span className={styles.op}>=</span> pipeline(extract <span className={styles.op}>&gt;&gt;</span> validate, name<span className={styles.op}>=</span><span className={styles.str}>&quot;invoice-intake&quot;</span>, retry<span className={styles.op}>=</span><span className={styles.num}>2</span>){"\n\n"}<span className={styles.cm}># run_batch fans out across up to 1,000 documents concurrently</span>{"\n"}results <span className={styles.op}>=</span> run_batch({"\n"}    pipeline_def,{"\n"}    inputs<span className={styles.op}>=</span>[{"{"}<span className={styles.str}>&quot;document_text&quot;</span>: text{"}"} <span className={styles.kw}>for</span> text <span className={styles.kw}>in</span> load_documents()],{"\n"}    max_concurrency<span className={styles.op}>=</span><span className={styles.num}>50</span>,{"\n"})</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="why">Why it&apos;s built this way</h2>
      <ul className={styles["doc-ul"]}>
        <li><strong>A typed Pydantic output</strong> on <code className={styles.code}>extract</code> means malformed extractions raise immediately instead of silently propagating bad data downstream</li>
        <li><strong>A separate validate step</strong> keeps anomaly detection logic out of the extraction prompt — easier to tune independently</li>
        <li><strong>run_batch with max_concurrency=50</strong> caps in-flight LLM calls so you don&apos;t blow through provider rate limits on a 1,000-document run</li>
      </ul>
    </>
  );
}
