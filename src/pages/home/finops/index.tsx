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
                title="Qocent FinOps — Control Your Cloud Spend"
                description="Stop overpaying for cloud. Qocent gives engineering and finance teams real-time visibility, budget alerts, and AI-powered recommendations across AWS, Azure, GCP, and Huawei."
                canonical="https://qocent.com/finops"
                image="https://qocent.com/og-image.jpg"
                schemaMarkup={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "FinOps - Qocent",
                    description:
                        "Stop overpaying for cloud. Qocent gives engineering and finance teams real-time visibility, budget alerts, and AI-powered recommendations across AWS, Azure, GCP, and Huawei.",
                    url: "https://qocent.com/finops",
                }}
            />

            <Navbar />
            <FinopsHero />
            <div id="finops-content" />
            <FinopsFeaturesSection />
            <PricingPlan />
            <AboutHowItWorks />
            <ElevateMessage />
            <Footer />
        </div>
    );
};

export default Finops;
