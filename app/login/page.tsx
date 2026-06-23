import type { Metadata } from "next";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your n00dles account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Sign in — n00dles",
    description: "Sign in to your n00dles account.",
    url: "/login",
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
