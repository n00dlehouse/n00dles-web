import type { DocBodyProps, DocMeta } from "../types";

export const meta: DocMeta = {
  section: "Examples",
  title: "Content Factory",
  lead: "Research, draft, SEO-optimize, and localize into three languages — fanned out in parallel — before a final human review gate.",
  toc: ["The pipeline", "Why it's built this way"],
};

export function Body({ styles }: DocBodyProps) {
  return (
    <>
      <h2 className={styles["doc-h2"]} id="pipeline">The pipeline</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python — content_factory.py</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> agent, pipeline, parallel, run{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>research</span>(topic: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Research the topic, return key points and sources.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-sonnet-4-6&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>draft</span>(research: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Write a 900-word blog post from the research.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;claude-haiku-4-5&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>seo_optimize</span>(draft: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Add headings, meta description, and keyword-optimized intro.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o-mini&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>localize_es</span>(seo_optimize: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Translate and culturally adapt the post for Spanish-speaking readers.&quot;&quot;&quot;</span>{"\n\n"}<span className={styles.kw}>@agent</span>(model<span className={styles.op}>=</span><span className={styles.str}>&quot;gpt-4o-mini&quot;</span>){"\n"}<span className={styles.kw}>def</span> <span className={styles.fn}>localize_de</span>(seo_optimize: <span className={styles.cls}>str</span>) <span className={styles.op}>-&gt;</span> <span className={styles.cls}>str</span>:{"\n"}    <span className={styles.str}>&quot;&quot;&quot;Translate and culturally adapt the post for German-speaking readers.&quot;&quot;&quot;</span>{"\n\n"}factory <span className={styles.op}>=</span> pipeline({"\n"}    research <span className={styles.op}>&gt;&gt;</span> draft <span className={styles.op}>&gt;&gt;</span> seo_optimize <span className={styles.op}>&gt;&gt;</span> parallel(localize_es, localize_de),{"\n"}    name<span className={styles.op}>=</span><span className={styles.str}>&quot;content-factory&quot;</span>,{"\n"}    retry<span className={styles.op}>=</span><span className={styles.num}>3</span>,{"\n"}){"\n\n"}<span className={styles.cm}># Runs daily via cron, scheduled with `noodles schedule`</span>{"\n"}result <span className={styles.op}>=</span> run(factory, topic<span className={styles.op}>=</span><span className={styles.str}>&quot;Q3 product roadmap&quot;</span>)</pre>
      </div>

      <h2 className={styles["doc-h2"]} id="why">Why it&apos;s built this way</h2>
      <ul className={styles["doc-ul"]}>
        <li><strong>Localization fans out in parallel</strong> at the end — each language is independent once there&apos;s a finished, SEO-optimized English draft</li>
        <li><strong>retry=3 on the whole pipeline</strong> because this runs unattended on a schedule — nobody&apos;s watching it fail at 3am</li>
        <li><strong>Cheap models everywhere except drafting</strong> — research, SEO, and translation are all lower-stakes than the actual prose</li>
      </ul>
    </>
  );
}
