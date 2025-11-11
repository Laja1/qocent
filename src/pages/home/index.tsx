import { Hero } from "./hero";
import { Services } from "./services";
import { Footer } from "@/components/shared";
import { Faq } from "./faq";
import { HowIt } from "./how-it";
import { HyperScalers } from "./hyperscalers";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
import { PartnerNetwork } from "./partner-network";

const Home = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qocent",
    url: "https://qocent.com",
    description:
      "Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers speed, savings, and simplicity without compromise.",
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
    <div className="dark:bg-black h-full w-full">
      <Seo
        title="Qocent - One Window, All Cloud"
        description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers speed, savings, and simplicity without compromise."
        canonical="https://qocent.com"
        schemaMarkup={websiteSchema}
      />

      {/* <NavbarDemo> */}
      <Navbar />
      <Hero />
      {/* <InfiniteCardCarousel /> */}

      <Services />
      <HyperScalers />
      <HowIt />
      <Faq />
      <PartnerNetwork />
      <Footer />
    </div>
  );
};

export default Home;
