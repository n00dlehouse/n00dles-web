import type { DocBodyProps, DocMeta } from "../types";

export const meta: DocMeta = {
  section: "Examples",
  title: "Research Pipeline",
  lead: "Scrape, summarize, analyze, and write a structured report from a raw topic — with the scrape-and-summarize step fanned out in parallel per source.",
  toc: ["The pipeline", "Why it's built this way"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="pipeline">The pipeline</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — research_pipeline.py</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_web</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find and scrape the 10 most relevant recent articles on the topic.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>scrape_papers</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>list</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Find the 5 most relevant academic papers on the topic.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>synthesize</span>(scrape_web: <span className={styles.cls}>list</span>, scrape_papers: <span className={styles.cls}>list</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Synthesize web articles and papers into 5-8 key findings.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>write_report</span>(synthesize: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a structured report with an executive summary and findings.&quot;&quot;&quot;</span>{"\n\n"}research <span className={styles.op}>=</span> pipeline({"\n"}    parallel(scrape_web, scrape_papers) <span className={styles.op}>&gt;&gt;</span> synthesize <span className={styles.op}>&gt;&gt;</span> write_report,{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;deep-research&quot;</span>,{"\n"}    timeout<span className={styles.op}>=</span><span className={styles.num}>90</span>,{"\n"}){"\n\n"}result <span className={styles.op}>=</span> run(research, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;agentic AI in regulated industries&quot;</span>)</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="why">Why it&apos;s built this way</h2>
      <ul className={styles["doc-ul"]}>
        <li><strong>Two scrapers run in parallel</strong> because they don&apos;t depend on each other — running them sequentially would just be wasted wall-clock time</li>
        <li><strong>A dedicated synthesize step</strong> merges both sources before writing, so the report writer never has to juggle two input shapes itself</li>
        <li><strong>Cheaper models for scraping</strong> (gpt-4o, haiku), a stronger model only for the synthesis and writing steps that actually need the reasoning</li>
      </ul>
    </>
  );
}
