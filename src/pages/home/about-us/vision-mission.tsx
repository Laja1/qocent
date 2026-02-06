import {  CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { EyeIcon, TargetIcon } from "lucide-react";

export const Vision = () => {
  return (
    <div>
      <section className="w-full dark:bg-black  lg:pt-20 md:py-10 pt-10  items-center  justify-center flex flex-col px-5">
        <div className="flex-col text-left mb-10 max-w-4xl ">
          <p className="text-xs md:text-sm lg:text-base text-left text-muted-foreground leading-relaxed mb-6">
            <span className="font-brfirma-bold text-black dark:text-white underline">Qocent</span> 
            is your unified gateway to multi-cloud infrastructure management.
Instead of juggling separate consoles for AWS, Azure, GCP, and Huawei,
manage everything from one powerful platform.
Deploy resources, monitor performance, optimize costs with FinOps, and
secure your environment—all without switching dashboards, learning
different interfaces, or compromising control.
          </p>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed ">
         
We built Qocent for developers and businesses tired of multi-cloud
complexity. Whether you're a solo developer managing side projects, a
startup scaling rapidly across regions, or an enterprise running mission-
critical infrastructure, Qocent brings clarity to cloud chaos. Link your existing
accounts in minutes, start managing immediately, and gain insights that were
previously scattered across multiple platforms.
          </p>
        </div>
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
          <div className="shadow-sm border rounded-md">
            <CardHeader className="flex text-gray-200 m-5 rounded-md bg-gradient-to-r from-black to-gray-900  flex-row items-center  py-1 justify-center">
              <EyeIcon className="h-8 w-8  text-gray-200" />
              <CardTitle className="text-sm font-bold">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm p-5 text-muted-foreground leading-relaxed">
              To become the global standard for multi-cloud management—making it as
easy to manage infrastructure across AWS, Azure, GCP, and Huawei as it is to
manage a single cloud provider.
              </p>
            </CardContent>
          </div>

          <div className="shadow-sm border rounded-md">
            <CardHeader className="flex text-gray-200 m-5 rounded-md bg-gradient-to-r from-black to-gray-900 flex-row items-center  py-1 justify-center">
              <TargetIcon className="h-8 w-8  text-gray-200" />
              <CardTitle className="text-sm font-bold">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm px-5 pb-3 text-muted-foreground leading-relaxed">
              We make multi-cloud management accessible to every business. Qocent
provides a unified, easy-to-use platform that connects to your existing AWS,
Azure, GCP, and Huawei infrastructure—delivering cost optimization, security
insights, and operational clarity from day one. We're committed to
transparent pricing, responsive support, and empowering organizations of all
sizes to harness multi-cloud advantages without the traditional complexity.
              </p>
            </CardContent>
          </div>
        </div>
      </section>
    </div>
  );
};
