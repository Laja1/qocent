import { Footer } from "@/components/shared";
import Developers from "./docs";
import { Hero } from "./hero";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
const Documentation = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="Qocent Documentation | Build, Deploy, Scale with Confidence"
        description="Learn how to build, deploy, and scale your applications on Qocent. Follow our step-by-step guide to get started with our powerful multi-cloud platform."
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
      <Developers />

      <Footer />
    </div>
  );
};

export default Documentation;
