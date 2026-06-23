import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your n00dles pipelines, runs, and deployments.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Dashboard — n00dles",
    description: "Manage your n00dles pipelines, runs, and deployments.",
    url: "/dashboard",
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
