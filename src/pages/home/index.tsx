import { CallToAction } from "./call-to-action";
import { Hero } from "./hero";

import NavbarDemo from "@/components/shared/navbar";
import { Services } from "./services";
import { Footer } from "@/components/shared";
import { Faq } from "./faq";
import { HowIt } from "./how-it";
import { HyperScalers } from "./hyperscalers";
import { Video } from "./video";
import Seo from "@/components/shared/seo";

const Home = () => {
  return (
    <div className=" h-full w-full">
      <Seo
        title="Qocent - One Window, All Cloud"
        description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers speed, savings, and simplicity without compromise."
        canonical="https://qcs-delta.vercel.app/"
      />

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
