import { Footer } from "@/components/shared";
import Developers from "./docs";
import { Hero } from "./hero";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
const Documentation = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="Your Qocent account setup guide"
        description="Follow our process for setting up your account on Qocent cloud computing platform "
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
