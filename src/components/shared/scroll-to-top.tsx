import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const forceScrollTop = () => {
  const prev = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  document.documentElement.style.scrollBehavior = prev;
};

export function ScrollWrapper({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    forceScrollTop();
  }, []);

  return <>{children}</>;
}

export function ScrollToTopOnPathChange() {
  const location = useLocation();

  useLayoutEffect(() => {
    forceScrollTop();

    const rafId = window.requestAnimationFrame(() => {
      forceScrollTop();
    });
    const timeoutId = window.setTimeout(() => {
      forceScrollTop();
    }, 80);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.key]);

  return null;
}
