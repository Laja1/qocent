import NavbarDemo from "@/components/shared/navbar";
import { Footer } from "@/components/shared";
import { Hero } from "./hero";
import { PartnersCard } from "./partners-card";

const Partners = () => {
  return (
    <div className=" h-full w-full">
      <NavbarDemo>
        <Hero />
        <PartnersCard />
        <Footer />
      </NavbarDemo>
    </div>
  );
};

export default Partners;
