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
import type { ReactElement } from "react";
import type { DocBodyProps, DocMeta } from "./content/types";

type DocModule = { meta: DocMeta; Body: (props: DocBodyProps) => ReactElement };

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

export const SIDEBAR = [
  {
    id: "start",
    label: "Getting Started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "quickstart", label: "Quick start" },
      { id: "first-pipeline", label: "Your first pipeline" },
    ],
  },
  {
    id: "concepts",
    label: "Core Concepts",
    items: [
      { id: "agents", label: "Agents" },
      { id: "pipelines", label: "Pipelines" },
      { id: "state", label: "State management" },
      { id: "errors", label: "Error handling" },
    ],
  },
  {
    id: "api",
    label: "API Reference",
    items: [
      { id: "agent-api", label: "@agent" },
      { id: "pipeline-api", label: "pipeline()" },
      { id: "run-api", label: "run()" },
      { id: "parallel-api", label: "parallel()" },
      { id: "branch-api", label: "branch()" },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    items: [
      { id: "deploy", label: "Production deploy" },
      { id: "testing", label: "Testing" },
      { id: "obs", label: "Observability" },
    ],
  },
  {
    id: "ex",
    label: "Examples",
    items: [
      { id: "ex-research", label: "Research pipeline" },
      { id: "ex-content", label: "Content factory" },
      { id: "ex-document", label: "Document processor" },
      { id: "ex-support", label: "Support triage" },
    ],
  },
];
