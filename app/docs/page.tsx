import type { Metadata } from "next";
import { DocsClient } from "./DocsClient";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Documentation for n00dles — installation, agents, pipelines, API reference, and production deploy guides.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs — n00dles",
    description:
      "Documentation for n00dles — installation, agents, pipelines, API reference, and production deploy guides.",
    url: "/docs",
  },
};

export default function DocsPage() {
  return <DocsClient />;
}
