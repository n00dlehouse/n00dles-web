import { useCopy } from "@/lib/useCopy";
import type { DocBodyProps, DocMeta } from "./types";

export const meta: DocMeta = {
  section: "Getting Started",
  title: "Installation",
  lead: "Get n00dles running in your Python environment. The core package has minimal dependencies and installs in seconds.",
  toc: ["Requirements", "Install", "Configure API keys", "Verify installation"],
};

export function Body({ styles }: DocBodyProps) {
  const [copied0, copy0] = useCopy();

  return (
    <>
      <h2 className={styles["doc-h2"]} id="requirements">Requirements</h2>
      <ul className={styles["doc-ul"]}>
        <li>Python 3.10 or later</li>
        <li>pip 22+ or Poetry 1.5+</li>
        <li>At least one LLM API key (Anthropic, OpenAI, etc.)</li>
      </ul>

      <h2 className={styles["doc-h2"]} id="install">Install</h2>
      <p className={styles["doc-p"]}>Install from PyPI with pip:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}>
          <span className={styles["code-lang"]}>bash</span>
          <button
            className={`${styles["code-copy"]}${copied0 ? ` ${styles.copied}` : ""}`}
            onClick={() => copy0("pip install n00dles")}
          >
            {copied0 ? "copied!" : "copy"}
          </button>
        </div>
        <pre>pip install n00dles</pre>
      </div>
      <p className={styles["doc-p"]}>Or with Poetry:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre>poetry add n00dles</pre>
      </div>
      <div className={`${styles.callout} ${styles.info}`}>
        <span className={styles["callout-icon"]}>ℹ</span>
        <div>For the latest unreleased features, install from GitHub: <code className={styles.code}>pip install git+https://github.com/n00dles/n00dles</code></div>
      </div>

      <h2 className={styles["doc-h2"]} id="api-keys">Configure API keys</h2>
      <p className={styles["doc-p"]}>n00dles reads LLM credentials from environment variables. Set the key for your preferred provider:</p>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>bash</span></div>
        <pre><span className={styles.cm}># Anthropic (recommended)</span>{"\n"}export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;{"\n\n"}<span className={styles.cm}># OpenAI</span>{"\n"}export OPENAI_API_KEY=&quot;sk-...&quot;{"\n\n"}<span className={styles.cm}># Mistral</span>{"\n"}export MISTRAL_API_KEY=&quot;...&quot;</pre>
      </div>
      <div className={`${styles.callout} ${styles.tip}`}>
        <span className={styles["callout-icon"]}>✓</span>
        <div>Add these to your <code className={styles.code}>.env</code> file and use <code className={styles.code}>python-dotenv</code> — n00dles will pick them up automatically.</div>
      </div>

      <h2 className={styles["doc-h2"]} id="verify">Verify installation</h2>
      <div className={styles["code-block"]}>
        <div className={styles["code-block-hd"]}><span className={styles["code-lang"]}>python</span></div>
        <pre><span className={styles.kw}>from</span> <span className={styles.cls}>n00dles</span> <span className={styles.kw}>import</span> version{"\n"}<span className={styles.fn}>print</span>(version())  <span className={styles.cm}># → &quot;0.1.0&quot;</span></pre>
      </div>
    </>
  );
}
