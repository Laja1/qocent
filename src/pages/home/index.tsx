import { NavBar } from "@/components/shared";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";

const Home = () => {
  return (
   <div className="bg-gradient-to-tr from-white to-[#edf2ef] h-screen w-full">
      <NavBar />
      <Hero />
      <HowItWorks />
    </div>
  );
};

export default Home;
