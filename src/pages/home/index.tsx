import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";

import NavbarDemo from "@/components/shared/navbar";
import { Services } from "./services";
import InfiniteCardCarousel from "./inifite-cards";
import { Footer } from "@/components/shared";

const Home = () => {
  return (
    <div className=" h-full w-full">
      <NavbarDemo>
        <Hero />
        <InfiniteCardCarousel />

        <Services />
        <CallToAction />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Home;
