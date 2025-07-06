import { Button } from "@/components/shared";
import { RouteConstant } from "@/router/routes";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:px-20 w-full mx-auto pt-10 flex">
        <div className="bg-gradient-to-br  from-[#1A1A1A] to-gray-950 items-center flex flex-col space-y-5 text-center w-full rounded-xl p-10 lg:p-20">
          <p className="bg-gradient-to-r text-xl lg:text-3xl font-poppins from-yellow-500 inline-block text-transparent to-[#750505] bg-clip-text">
            Boost Your Productivity
          </p>
          <p className="text-white text-xs lg:text-sm leading-loose  max-w-3xl">
  Deploy faster. Scale without stress. With QCS, everything from setup to ship is made simpler. Built on trusted infrastructure, we take care of the heavy lifting so you can stay focused on building what matters.
</p>

          <Button
            label="Try QCS Now!"
            intent="secondary"
            onClick={() => navigate(RouteConstant.auth.signin.path)}
            className="inline-block"
          />
        </div>
      </div>
    </div>
  );
};
