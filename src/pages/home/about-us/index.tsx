import { Hero } from "./hero";
import { Vision } from "./vision-mission";
import { Footer } from "@/components/shared";
import InfiniteCardCarousel from "./inifite-cards";
import Seo from "@/components/shared/seo";
import Navbar from "@/components/shared/navbar2";

const AboutUs = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="Qocent–About Us"
        description="See what makes our multi-cloud management platform different from others.  "
        canonical="https://qocent.com/about"
        image="https://qocent.com/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "About Us - Qocent",
          description:
            "See what makes our multi-cloud management platform different from others.  ",
          url: "https://qocent.com/about",
        }}
      />

      <Navbar />
      <Hero />
      <Vision />
      <InfiniteCardCarousel />
      <Footer />
    </div>
  );
};

export default AboutUs;
