import * as installation from "./content/installation";
import * as quickstart from "./content/quickstart";
import * as firstPipeline from "./content/first-pipeline";
import * as agents from "./content/agents";
import * as pipelines from "./content/pipelines";
import * as state from "./content/state";
import * as errors from "./content/errors";
import * as agentApi from "./content/agent-api";
import * as pipelineApi from "./content/pipeline-api";
import * as runApi from "./content/run-api";
import * as parallelApi from "./content/parallel-api";
import * as branchApi from "./content/branch-api";
import * as deploy from "./content/deploy";
import * as testing from "./content/testing";
import * as observability from "./content/observability";
import * as exResearch from "./content/examples/research-pipeline";
import * as exContent from "./content/examples/content-factory";
import * as exDocument from "./content/examples/document-processor";
import * as exSupport from "./content/examples/support-triage";
import type { DocBodyProps, DocMeta } from "./content/types";

type DocModule = { meta: DocMeta; Body: (props: DocBodyProps) => React.ReactElement };

const MODULES: Record<string, DocModule> = {
  installation,
  quickstart,
  "first-pipeline": firstPipeline,
  agents,
  pipelines,
  state,
  errors,
  "agent-api": agentApi,
  "pipeline-api": pipelineApi,
  "run-api": runApi,
  "parallel-api": parallelApi,
  "branch-api": branchApi,
  deploy,
  testing,
  obs: observability,
  "ex-research": exResearch,
  "ex-content": exContent,
  "ex-document": exDocument,
  "ex-support": exSupport,
};

/** Linear chain order — drives prev/next links. Examples are a separate short chain. */
const MAIN_ORDER = [
  "installation",
  "quickstart",
  "first-pipeline",
  "agents",
  "pipelines",
  "state",
  "errors",
  "agent-api",
  "pipeline-api",
  "run-api",
  "parallel-api",
  "branch-api",
  "deploy",
  "testing",
  "obs",
];

const EXAMPLES_ORDER = ["ex-research", "ex-content", "ex-document", "ex-support"];

export type DocEntry = {
  id: string;
  meta: DocMeta;
  Body: DocModule["Body"];
  prev?: string;
  next?: string;
};

function buildChain(order: string[]): Record<string, DocEntry> {
  const out: Record<string, DocEntry> = {};
  order.forEach((id, i) => {
    out[id] = {
      id,
      meta: MODULES[id].meta,
      Body: MODULES[id].Body,
      prev: order[i - 1],
      next: order[i + 1],
    };
  });
  return out;
}

export const DOCS: Record<string, DocEntry> = {
  ...buildChain(MAIN_ORDER),
  ...buildChain(EXAMPLES_ORDER),
};

type SidebarItem = { id: string; label: string; soon: boolean };

export const SIDEBAR: { id: string; label: string; items: SidebarItem[] }[] = [
  {
    id: "start",
    label: "Getting Started",
    items: [
      { id: "installation", label: "Installation", soon: false },
      { id: "quickstart", label: "Quick start", soon: false },
      { id: "first-pipeline", label: "Your first pipeline", soon: false },
    ],
  },
  {
    id: "concepts",
    label: "Core Concepts",
    items: [
      { id: "agents", label: "Agents", soon: false },
      { id: "pipelines", label: "Pipelines", soon: false },
      { id: "state", label: "State management", soon: false },
      { id: "errors", label: "Error handling", soon: false },
    ],
  },
  {
    id: "api",
    label: "API Reference",
    items: [
      { id: "agent-api", label: "@agent", soon: false },
      { id: "pipeline-api", label: "pipeline()", soon: false },
      { id: "run-api", label: "run()", soon: false },
      { id: "parallel-api", label: "parallel()", soon: false },
      { id: "branch-api", label: "branch()", soon: false },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    items: [
      { id: "deploy", label: "Production deploy", soon: true },
      { id: "testing", label: "Testing", soon: false },
      { id: "obs", label: "Observability", soon: false },
    ],
  },
  {
    id: "ex",
    label: "Examples",
    items: [
      { id: "ex-research", label: "Research pipeline", soon: false },
      { id: "ex-content", label: "Content factory", soon: false },
      { id: "ex-document", label: "Document processor", soon: false },
      { id: "ex-support", label: "Support triage", soon: false },
    ],
  },
];
