"use client";
//THIRD PARTY MODULES
import { useEffect, useState } from "react";

type BrowserOnlyType = { children: JSX.Element | null; renderAfter?: number };

export default function BrowserOnly({
  children,
  renderAfter,
}: BrowserOnlyType) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      if (renderAfter) {
        setTimeout(() => {
          setMounted(true);
        }, renderAfter);
      } else {
        setMounted(true);
      }
    }
  }, [mounted, renderAfter]);

  if (!mounted) return null;

  return children;
}
