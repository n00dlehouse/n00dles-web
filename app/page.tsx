import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "n00dles — Multi-Agent AI Orchestration. Untangle Your LLM Pipelines.",
  description:
    "Open-source multi-agent AI orchestration built for engineers who ship. Chain agents, manage state, handle failures — without 800 lines of boilerplate.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "n00dles — Multi-Agent AI Orchestration",
    description:
      "Open-source multi-agent AI orchestration built for engineers who ship. Chain agents, manage state, handle failures — without 800 lines of boilerplate.",
    url: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
