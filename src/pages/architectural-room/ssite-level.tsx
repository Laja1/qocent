
import { svgLinks } from "@/assets/assetLink";
import {  Server } from "lucide-react";

export const ConnectedBoxes = () => {
  return (
    <div className="relative mt-10 border p-10 mx-5 border-purple-800 w-full">

    <div className="border flex flex-col relative p-10 rounded-sm border-green-700 px-5 py-3 mx-10 gap-10">
  {/* Centered green-box above */}
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
    <div
     
      className="border bg-green-50 rounded-full border-green-700 px-3 h-[50px] w-fit flex flex-col items-center justify-center"
    >
      <img src={svgLinks.igw} className="size-7"/>

      <p className="text-[8px]">IGW</p>
    </div>
  </div>


      <div className="grid grid-cols-3 w-full ">
        <div className="flex flex-col w-full gap-2">
          
          <div
            
            className="border bg-red-50 gap-4 grid grid-cols-2 rounded-sm border-red-700 px-5 py-3 w-full flex items-center justify-center"
          >
           
            <div className="flex flex-col items-center text-xs">
            <Server className="text-blue-800"/>
            <p>server x</p>
            </div>
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>

          <div
            
            className="border rounded-sm border-red-700 bg-red-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>
          <div
            id="blue-box"
            className="border rounded-sm border-blue-700 bg-blue-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>
        
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-10">
          
          {/* <div
            id="blue-box"
            className="border bg-blue-50 rounded-sm border-blue-700 px-5 py-3 w-full flex items-center justify-center"
          >
            <Server />
          </div> */}

<div className="justify-center flex items-center">
          <div
            
            className="border bg-green-50 rounded-sm border-green-700 px-4 py-2 w-fit flex items-center justify-center"
          >
           <div className="flex flex-col items-center text-xs">
<img src={svgLinks.router} className="size-8"/>
            <p>DG</p>
            </div>
          </div>
        </div>
          {/* <div
            id="blue-box"
            className="border rounded-sm border-blue-700 bg-blue-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div> */}
          {/* <div
            id="blue-box"
            className="border rounded-sm border-blue-700 bg-blue-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col w-full gap-2">
          
          <div
            id="purple-box"
            className="border bg-purple-50 rounded-sm border-purple-700 px-5 py-3 w-full flex items-center justify-center"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>

          
          <div
            id="purple-box"
            className="border rounded-sm border-purple-700 bg-purple-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>
          <div
            id="purple-box"
            className="border rounded-sm border-purple-700 bg-purple-50 px-5 py-3 w-full"
          >
            <div className="flex flex-col items-center text-xs">
            <Server />
            <p>server x</p>
            </div>
          </div>
        </div></div>
      </div>
      <p className="text-center mt-2">House 1</p>

    </div>
  );
};
