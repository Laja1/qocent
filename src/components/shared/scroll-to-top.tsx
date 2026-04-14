import { useLayoutEffect, type ReactNode } from "react";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export function ScrollWrapper({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = prev;
  }, []);

  return <>{children}</>;
}
