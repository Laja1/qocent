import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";

import NavbarDemo from "@/components/shared/navbar";
import { Services } from "./services";
import { Footer } from "@/components/shared";
import { Faq } from "./faq";
import { HowIt } from "./how-it";
import { HyperScalers } from "./hyperscalers";
import { Video } from "./video";

const Home = () => {
  return (
    <div className=" h-full w-full">
      <NavbarDemo>
        <Hero />
        {/* <InfiniteCardCarousel /> */}

        <Services />
        <HyperScalers />
        <HowIt />
        <Video />
        <Faq />

        <CallToAction />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Home;
