import { Footer } from "@/components/shared";
import Navbar from "@/components/shared/navbar2";
import Seo from "@/components/shared/seo";
import ElevateMessage from "../home/elevate_message";
import PricingPlan from "../pricing/pricing-plan";
import AboutHowItWorks from "./about-how-it-works";
import FinopsFeaturesSection from "./finops-features";
import FinopsHero from "./finops-hero";

const Finops = () => {
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
            <FinopsHero />
            <FinopsFeaturesSection />
            <PricingPlan />
            <AboutHowItWorks />
            <ElevateMessage />
            <Footer />
        </div>
    );
};

export default Finops;
