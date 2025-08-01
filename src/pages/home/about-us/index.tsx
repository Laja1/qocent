import NavbarDemo from "@/components/shared/navbar";
import { Hero } from "./hero";
import { Vision } from "./vision-mission";
import { Footer } from "@/components/shared";
import InfiniteCardCarousel from "./inifite-cards";
import Seo from "@/components/shared/seo";

const AboutUs = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="About Us | Qocent - One Window, All Cloud"
        description="Discover how Qocent empowers developers and businesses with multi-cloud flexibility, transparency, simplicity, and speed — all from one unified platform."
        canonical="https://qcs-delta.vercel.app/about"
        image="https://qcs-delta.vercel.app/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "About Us - Qocent",
          description:
            "Discover how Qocent empowers developers and businesses with multi-cloud flexibility, transparency, simplicity, and speed — all from one unified platform.",
          url: "https://qcs-delta.vercel.app/about",
        }}
      />

      <NavbarDemo>
        <Hero />
        <Vision />
        <InfiniteCardCarousel />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default AboutUs;
