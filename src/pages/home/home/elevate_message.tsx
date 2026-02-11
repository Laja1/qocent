import { HeroHeader } from "@/components/shared/hero-header";
import { ArrowUpRight } from "lucide-react";

export default function ElevateMessage() {
    return (
        <section className="p-12 px-6 md:p-32 md:px-28 bg-black lg:h-screen 2xl:h-2/3 mt-12 md:mt-0">
            <div className="rounded-lg max-w-[90rem] mx-auto bg-[#E3D1D1] space-y-8 md:space-y-0 md:h-full grid place-items-center p-4">
                <HeroHeader hideLine={true} description="Unlock your financial potential with Qocent. We provide personalized tools and insights to elevate your financial journey" badgeText="FINANCE ELEVATION" >
                    <h2 className="self-center md:max-w-1/2 font-bold my-6 text-center text-lg md:text-5xl">
                        Elevate your Cloud financial journey with Qocent's FinOps
                    </h2>
                </HeroHeader>

                <button className="w-fit px-4 md:px-8 bg-black gap-3 text-white rounded-full text-md md:text-lg p-2 md:p-4 flex items-center justify-center">
                    <span>Sign up now</span>
                    <ArrowUpRight size={24} />
                </button>
            </div>
        </section>
    )
}
