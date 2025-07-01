import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RouteConstant } from "@/router/routes";

export const Hero = () => {
  const heroData = [
    {
      title: "Sign Up",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      icon: <ArrowRightIcon className="w-4 h-4" />,
      path: RouteConstant.auth.signup.path,
    },
    {
      title: "Sign In",
      description:
        "Lorem ipsum dolor sit amet consectetur acing elit. Quisquam, quos.",
      icon: <ArrowRightIcon className="w-4 h-4" />,
      path: RouteConstant.auth.signin.path,
    },
  ];
  return (
    <div className="flex gap-4 text-white">
      {heroData.map((item) => (
        <motion.div
          key={item.description}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="bg-gradient-to-tr from-gray-600 to-black relative rounded-lg w-[280px] h-[300px] p-4"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{item.title}</h1>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <div className="flex absolute bottom-4 right-3">
            <div className=" items-center p-2 rounded-full border border-white  inline-block">
              <Link to={item.path}>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
