import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/shared";
import Navbar from "@/components/shared/navbar2";
import Seo from "@/components/shared/seo";
import { Hero } from "./hero";
import DocsSidebar from "./DocsSidebar";

const Documentation = () => {
  const [isFixed, setIsFixed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFixed(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <Seo
        title="Qocent Documentation"
        description="Step-by-step guides for deploying and managing cloud infrastructure on Qocent."
        canonical="https://qocent.com/docs"
        image="https://qocent.com/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          name: "Qocent Documentation",
          description:
            "Step-by-step technical documentation to help you get started with Qocent — from deploying across clouds to managing your infrastructure with ease.",
          url: "https://qocent.com/docs",
        }}
      />

      <Navbar />
      <Hero />

      {/* Sentinel: sits at the top of the docs body, watched by the observer */}
      <div ref={sentinelRef} className="h-0 w-full" />

      {/* Docs body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex gap-12">

        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div
            className={`w-56 transition-none ${
              isFixed ? "fixed top-24" : "relative"
            }`}
          >
            <DocsSidebar />
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0 pb-20">
          <Outlet />
        </main>

      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
