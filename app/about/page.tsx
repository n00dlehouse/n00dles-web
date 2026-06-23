import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "n00dles started as a weekend project to fix multi-agent orchestration. Meet the team building the framework we always wanted.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — n00dles",
    description:
      "n00dles started as a weekend project to fix multi-agent orchestration. Meet the team building the framework we always wanted.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
