import {  CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { EyeIcon, TargetIcon } from "lucide-react";

export const Vision = () => {
  return (
    <div>
      <section className="w-full  lg:pt-20 md:py-10 pt-10  items-center  justify-center flex flex-col px-5">
        <div className="flex-col text-left mb-10 max-w-4xl ">
          <p className="text-xs md:text-sm lg:text-base text-left text-muted-foreground leading-relaxed mb-6">
            <span className="font-brfirma-bold text-black underline">Qocent</span> is your
            single gateway to the world’s leading cloud platforms: AWS, Azure,
            GCP, Oracle, Huawei, and more. With a unified and intuitive console,
            we simplify multi-cloud deployment, management, and scaling, no more
            switching between platforms, pricing models, or dashboards.
          </p>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed ">
            We are built for businesses that demand flexibility, transparency,
            and speed. Whether you&apos;re a startup deploying your first app or
            an enterprise optimizing infrastructure across regions, Qocent
            brings everything together into one seamless experience.
          </p>
        </div>
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
          <div className="shadow-sm border rounded-md">
            <CardHeader className="flex text-gray-200 m-5 rounded-md bg-gradient-to-r from-black to-gray-900 drop-shadow-amber-100 drop-shadow-2xl flex-row items-center  py-1 justify-center">
              <EyeIcon className="h-8 w-8  text-gray-200" />
              <CardTitle className="text-lg font-bold">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm p-5 text-muted-foreground leading-relaxed">
                To become a global leader in cloud services by providing the
                most accessible, easy-to-use, multi-cloud, and cost-effective
                platform that helps organizations unlock the full potential of
                technology.
              </p>
            </CardContent>
          </div>

          <div className="shadow-sm border rounded-md">
            <CardHeader className="flex text-gray-200 m-5 rounded-md bg-gradient-to-r from-black to-gray-900 flex-row items-center drop-shadow-teal-100 drop-shadow-2xl  py-1 justify-center">
              <TargetIcon className="h-8 w-8  text-gray-200" />
              <CardTitle className="text-lg font-bold">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm px-5 pb-3 text-muted-foreground leading-relaxed">
                Our mission is to simplify access to cloud technology by
                delivering a user-friendly, affordable, multi-cloud, and
                reliable platform built on world-class infrastructure. We are
                focused on empowering businesses of all sizes, especially in
                emerging markets, through transparent pricing, responsive
                support, and seamless digital experiences.
              </p>
            </CardContent>
          </div>
        </div>
      </section>
    </div>
  );
};
