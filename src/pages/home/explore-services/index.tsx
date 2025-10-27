import { Hero } from "./hero";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";
import { Footer } from "@/components/shared";
import Service from "./service-modal";

const ExploreServices = () => {
  return (
    <div className="dark:bg-black h-full w-full">
      <Seo
        title="Explore Services | Qocent - 361+ Integrated Cloud Services"
        description="Qocent offers a robust and diverse portfolio of cloud services, built on the reliable foundations of AWS and Huawei — designed to meet the demands of any application or workload."
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
