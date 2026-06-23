"use client";

import { useCallback, useState } from "react";

/** Copy-to-clipboard with a transient "copied!" flag, mirroring the copyCmd() helper used across index/docs/quickstart. */
export function useCopy(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), timeoutMs);
    },
    [timeoutMs]
  );

  return [copied, copy] as const;
}
