import NavbarDemo from "@/components/shared/navbar";
import { Footer } from "@/components/shared";
import Developers from "./docs";
import { Hero } from "./hero";

const Documentation = () => {
  return (
    <div className=" h-full w-full">
      <NavbarDemo>
        <Hero />
        <Developers />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Documentation;
