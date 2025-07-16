import { navRoutes } from "@/router/routes";
import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <div className=" border-t text-gray-400 mt-10  w-full bg-white">
      <div className="flex lg:flex-row flex-col justify-between px-5 lg:px-20 py-5 gap-2">
        <div className="text-left">
          <p className="text-2xl text-black">QOCENT</p>
          <h1 className=" text-xs lg:text-sm text-neutral-600">
        QOCENT. All rights reserved. © {new Date().getFullYear()}
      </h1>
      <div className="flex space-x-3 mt-2">
                {[IconBrandTwitter, IconBrandGithub, IconBrandLinkedin, IconBrandFacebook].map((Icon, index) => (
                  <a key={index} href="#" className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </a>
                ))}
              </div>
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
