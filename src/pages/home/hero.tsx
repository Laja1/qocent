import { Button } from "@/components/shared/button";

export const Hero = () => {

  return (
   <div>
      <div className="flex flex-col items-center justify-center mt-20  text-center px-4">
        <h1 className="text-4xl font-brfirma-bold  md:text-6xl font-bold max-w-3xl bg-gradient-to-r from-yellow-500  inline-block text-transparent to-[#750505] bg-clip-text">
          Empowering the Future with Cloud Technology
        </h1>
        <p className="mt-4 text-base md:text-xl text-gray-600 max-w-xl">
          Discover scalable solutions, fast deployment, and real-time access to infrastructure with our cloud-first approach.
        </p>
       <div>  
        <Button label="Get Started with Cloud" className="mt-8 w-[200px]" onClick={()=>{
        window.location.href = "/signup";
       }}/>
       </div> 
       <div className="my-20">
       <div className="w-sm md:w-xl lg:w-5xl  aspect-video rounded-md overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/7T7SyMZihwo?rel=0"
    title="YouTube video player"
    className="w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>


</div>

      </div>
      

    </div>
  );
};
