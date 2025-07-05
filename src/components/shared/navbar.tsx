import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navRoutes, RouteConstant } from "@/router/routes";
import { Button } from "./button";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="text-primary">
      <div className="justify-between px-20 py-5 items-center hidden lg:flex flex-row">
        <p  onClick={() => navigate('/')} className="text-black text-2xl font-brfirma-bold cursor-pointer font-bold">QCS</p>
        <div className="flex flex-row text-lg gap-10">
          {navRoutes.slice(0, 6).map((route, index) => (
            <a
              key={index}
              onClick={() => navigate(route.path)}
              className="hover:text-red-700  text-base cursor-pointer"
            >
              {route.name}
            </a>
          ))}
        </div>

        <div className="flex-row flex items-center gap-10">
          <h1
            onClick={() => navigate(RouteConstant.auth.signin.path)}
            className="cursor-pointer text-green-700 hover:hover:text-red-700"
          >
            {RouteConstant.auth.signin.name}
          </h1>
          <Button
                      label="Sign up"
                     
            onClick={() => navigate(RouteConstant.auth.signup.path)}
          />
        </div>
      </div>

      <div className="justify-between px-5 pt-10 items-center flex lg:hidden flex-row">
        <p className="text-2xl font-brfirma-bold items-center gap-10">QCS</p>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <MdClose color="black" size={24} />
          ) : (
            <FiMenu color="black" size={24} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#fff] p-5 absolute shadow-xl w-full z-10 transition-all duration-300">
          <div className="flex flex-col text-lg gap-3 mb-3">
            {navRoutes.slice(0, 8).map((route, index) => (
              <a key={index} href={`#${route.id}`}>
                <h2 className="hover:text-gray-600  text-black cursor-pointer">
                  {route.name}
                </h2>
              </a>
            ))}
          </div>
          <div className="flex-col flex gap-6">
            <h2
              onClick={() => navigate(RouteConstant.auth.signin.path)}
              className="cursor-pointer  text-[18px] text-black hover:text-gray-600"
            >
              {RouteConstant.auth.signin.name}
            </h2>

            <Button
              label="Sign up"
              className="w-full"
              onClick={() => navigate(RouteConstant.auth.signup.path)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
