import { Footer } from "@/components/shared";
import { Hero } from "./hero";
import { PartnersCard } from "./partners-card";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";

const Partners = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="Our Cloud Partners | Qocent - Unified Cloud Access"
        description="Discover how Qocent connects you to top cloud platforms — enabling you to build, scale, and innovate with ease. Start your journey in just a few clicks."
        canonical="https://qocent.com/partners"
        image="https://qocent.com/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Our Cloud Partners - Qocent",
          description:
            "Explore Qocent's ecosystem of cloud partners including AWS, Huawei, and more — unified for seamless deployment, scalability, and innovation.",
          url: "https://qocent.com/partners",
        }}
      />

      <Navbar />

      <Hero />
      <PartnersCard />
      <Footer />
    </div>
  );
};

export default Partners;
