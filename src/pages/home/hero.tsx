import { NavBar } from "@/components/shared";
import { Button } from "@/components/shared/button";

export const Hero = () => {
  
  return (
    <div className="bg-gradient-to-tr from-amber-100 to-[#edf2ef] h-screen w-full">
      <NavBar />
      <div className="flex flex-col items-center justify-center mt-20  text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-2xl">
          Empowering the Future with Cloud Technology
        </h1>
        <p className="mt-4 text-base md:text-xl text-gray-600 max-w-xl">
          Discover scalable solutions, fast deployment, and real-time access to infrastructure with our cloud-first approach.
        </p>
       <div>  <Button label="Get Started with Cloud" className="mt-8 w-[200px]" onClick={()=>{
        window.location.href = "/signup";
       }}/></div> 
      </div>
     
    </div>
  );
};
