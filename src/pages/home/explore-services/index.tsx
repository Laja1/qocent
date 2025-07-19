import NavbarDemo from "@/components/shared/navbar";
import { Footer } from "@/components/shared";
import { Hero } from "./hero";
import { Compute } from "./compute";
import { Storage } from "./storage";

const ExploreServices = () => {
  return (
    <div className=" h-full w-full">
      <NavbarDemo>
        <Hero />
        {/* <InfiniteCardCarousel /> */}
        <Compute />
        <Storage />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default ExploreServices;
