import { Footer } from "@/components/shared";
import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { PresentIn } from "./present-in";
import { TrustedBy } from "./trusted-by";
import NavbarDemo from "@/components/shared/navbar";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-white to-[#edf2ef] h-full w-full">
      
     <NavbarDemo >
      <Hero />
      <HowItWorks />
      <TrustedBy />
      <PresentIn />
      <CallToAction />
      <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Home;

