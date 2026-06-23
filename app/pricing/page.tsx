import type { Metadata } from "next";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. Free to start. Scale when you need.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — n00dles",
    description: "Simple, transparent pricing. Free to start. Scale when you need.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
