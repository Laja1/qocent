import { navRoutes } from "@/router/routes";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <div className="border-t text-gray-400 mt-10 w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 px-5 lg:px-20 py-5 gap-10">
        {/* Brand + Socials */}
        <div className="text-left">
          <p className="text-2xl text-black font-bold">QOCENT</p>
          <h1 className="text-xs lg:text-sm text-neutral-600 mt-1">
            QOCENT. All rights reserved. © {new Date().getFullYear()}
          </h1>
          <div className="flex space-x-3 mt-4">
            {[
              IconBrandTwitter,
              IconBrandGithub,
              IconBrandLinkedin,
              IconBrandFacebook,
            ].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center">
          <div className="flex flex-row gap-10 space-y-2">
            {navRoutes.map((route, index) => (
              <a href={`#${route.id}`} key={index}>
                <p className="text-xs lg:text-sm hover:text-black transition-colors">
                  {route.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-left lg:text-right flex flex-col items-left lg:items-end space-y-2">
          <h3 className="text-sm font-semibold text-black">Contact Us</h3>
          <p className="flex items-center gap-2 text-xs">
            <MdEmail className="text-lg" />
            contact@qocent.com
          </p>
          <div className="text-xs flex flex-col lg:flex-row gap-4 lg:space-y-1 text-left lg:text-right">
            <p>📞 +1 (800) 123-4567 (USA)</p>
            <p>📞 +234 8105445678 (Nigeria)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
