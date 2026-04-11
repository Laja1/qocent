import { Footer } from "@/components/shared";
import Navbar from "@/components/shared/navbar2";
import Seo from "@/components/shared/seo";
import ElevateMessage from "../home/elevate_message";
import Benefits from "./benefits";
// import Customers from "./customers";
import { AboutHero } from "./Hero";
import OurValue from "./our-value";
// import TeamSection from "./team";

const AboutUs = () => {
  return (
    <div className="h-full w-full">
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
      <AboutHero />
      <OurValue />
      {/* <TeamSection /> */}
      <Benefits />
      {/* <Customers /> */}
      <ElevateMessage />
      <Footer />
    </div>
  );
};

export default AboutUs;
