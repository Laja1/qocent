import { Hero } from "./hero";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
import { Footer } from "@/components/shared";
import Service from "./service-modal";

const ExploreServices = () => {
  return (
    <div className="h-full w-full">
      <Seo
        title="Qocent multi-cloud management platform solutions"
        description="Explore our multi-cloud management platform for cutting-edge solutions, from cloud management and optimization to migration and modernization."
        canonical="https://qocent.com/services"
        image="https://qocent.com/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Explore Services - Qocent",
          description:
            "Explore Qocent’s 361+ integrated cloud services across AWS, Huawei, and more — optimized for scale, performance, and reliability.",
          url: "https://qocent.com/services",
        }}
      />

      <Navbar />
      <Hero />

      <Service />
      {/* <InfiniteCardCarousel /> */}
      {/* <Compute />
      <Storage /> */}
      <Footer />
    </div>
  );
};

export default ExploreServices;
