"use client";

import { useEffect } from "react";

/**
 * Observes every [data-reveal] element on the page and stamps data-v once
 * it scrolls into view, matching the original dc-runtime componentDidMount
 * behavior (single page-level IntersectionObserver, not one per element).
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-v", "");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
