import NavbarDemo from "@/components/shared/navbar";
import { Hero } from "./hero";
import { Vision } from "./vision-mission";
import { Footer } from "@/components/shared";
import InfiniteCardCarousel from "./inifite-cards";

const AboutUs = () => {
  return (
    <div className=" h-full w-full">
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
