import { useState } from "react";
import JoinEmailField from "./join-waitlist-textfield";

export const CallToAction = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleIsClicked = () => {
    setClicked(true);
    // setTimeout(() => setClicked(false), 6000);
  };
  return (
    <div id="join-waitlist">

      <div className="lg:px-10 w-full mx-auto pt-10 flex">
        <div className="bg-neutral-200 items-center flex flex-col space-y-5 text-center w-full rounded-sm p-5 lg:p-20">
          <p className="bg-gradient-to-r text-xl lg:text-3xl font-poppins from-yellow-800 inline-block text-transparent to-[#750505] bg-clip-text">
            Everything You Need, Nothing You Don’t
          </p>
          <p className="text-black text-xs lg:text-sm leading-loose  max-w-3xl">
            Qocent puts the power of every major cloud in one place, so you can
            deploy, manage, and scale without limits. With unmatched multicloud
            flexibility, simplified operations, and unbeatable value, we help
            you build faster, smarter, and with complete control.
          </p>

          <JoinEmailField clicked={clicked} handleIsClicked={handleIsClicked} />
        </div>
      </div>
    </div>
  );
};
