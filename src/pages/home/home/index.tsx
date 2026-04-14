import { Footer } from "@/components/shared";
import Navbar from "@/components/shared/navbar2";
import Seo from "@/components/shared/seo";
import Comparison from "../services";
import ElevateMessage from "./elevate_message";
import { Faq } from "./faq";
import Hero from "./hero";
import HowItWorksSteps from "./how-it";
import { ProblemWeSolve } from "./problem-solve";
import QocentSolution from "./solution";

const Home = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qocent",
    url: "https://qocent.com",
    title: "Qocent–Cloud Services Provider",
    description:
      "Monitor and scale multi-cloud deployments through Qocent cloud services. Manage your AWS, Azure, Huawei and Google Cloud accounts in one place.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://qocent.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Qocent",
      url: "https://qocent.com",
      logo: {
        "@type": "ImageObject",
        url: "https://qocent.com/logomark.svg",
      },
      sameAs: [
        "https://x.com/InfoQocent",
        "https://www.linkedin.com/company/qocent/",
        "https://facebook.com/InfoQocent",
      ],
    },
  };

  return (
    <div className="h-full w-full">
      <Seo
        title="Qocent - One Window, All Cloud"
        description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers speed, savings, and simplicity without compromise."
        canonical="https://qocent.com"
        schemaMarkup={websiteSchema}
      />
      {/* <div className="h-[300vh]"></div> */}

      <Navbar />
      <Hero />
      <div id="home-content" />
      <ProblemWeSolve />
      <QocentSolution />
      <HowItWorksSteps />
      <Comparison />
      <Faq />
      <ElevateMessage />
      <Footer />
    </div>
  );
};

export default Home;
