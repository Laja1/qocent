import { Footer } from "@/components/shared";
import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import NavbarDemo from "@/components/shared/navbar";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-white to-[#edf2ef] h-full w-full">
      
     <NavbarDemo >
      <Hero />
      <HowItWorks />
      <CallToAction />
      <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Home;

