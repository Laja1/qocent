import { Footer } from "@/components/shared";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
import { ProblemWeSolve } from "./problem-solve";
import { Hero } from "./hero";
import { Services } from "../services";
import { Faq } from "./faq";
import { PartnerNetwork } from "../partner-network";
import QocentSolution from "./solution";
import HowItWorks from "./how-it";

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

      {/* <NavbarDemo> */}
      <Navbar />
      <Hero />
      <ProblemWeSolve />
      {/* <InfiniteCardCarousel /> */}
    <QocentSolution />
    <HowItWorks />

      <Services />
      <Faq />
      <PartnerNetwork />
      <Footer />
    </div>
  );
};

export default Home;
