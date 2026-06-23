import type { Metadata } from "next";
import { NotFoundClient } from "./NotFoundClient";

export const metadata: Metadata = {
  title: "404",
  description: "These noodles went cold. The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundClient />;
}
