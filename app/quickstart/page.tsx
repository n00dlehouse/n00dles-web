import type { Metadata } from "next";
import { QuickstartClient } from "./QuickstartClient";

export const metadata: Metadata = {
  title: "Quick Start",
  description:
    "Install n00dles, define three agents, chain them into a pipeline, and run it — first pipeline in under 5 minutes.",
  alternates: { canonical: "/quickstart" },
  openGraph: {
    title: "Quick Start — n00dles",
    description:
      "Install n00dles, define three agents, chain them into a pipeline, and run it — first pipeline in under 5 minutes.",
    url: "/quickstart",
  },
};

export default function QuickstartPage() {
  return <QuickstartClient />;
}
