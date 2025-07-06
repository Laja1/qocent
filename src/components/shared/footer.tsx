import { navRoutes } from "@/router/routes";

export const Footer = () => {
  return (
    <div className=" border-t text-gray-400 mt-20  w-full bg-white">
      <div className="flex lg:flex-row flex-col justify-between px-5 lg:px-20 py-10 gap-2">
        <div className="text-left">
          <p className="text-2xl text-black">QCS</p>
          <h1 className=" text-xs lg:text-sm text-neutral-600">
        QCS. All rights reserved. © {new Date().getFullYear()}
      </h1>
        </div>
        <div className="flex gap-10">
          <div>
            {navRoutes.slice(0, 2).map((route, index) => (
              <a href={`#${route.id}`} key={index}>
                <p className="text-[#000000099] text-xs lg:text-sm text-left">{route.name}</p>
              </a>
            ))}
           
          </div>
          <div>
            {navRoutes.slice(2, 4).map((route, index) => (
              <a href={`#${route.id}`} key={index}>
                <p className="text-[#000000099] text-xs lg:text-sm text-left">{route.name}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
