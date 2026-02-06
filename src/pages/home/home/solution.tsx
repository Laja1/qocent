import { imgLinks } from "@/assets/assetLink";
import { ChartIcon } from "@/assets/icons/chart";
import { Padlock } from "@/assets/icons/padlock";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";

export default function QocentSolution() {
    return (
      <section className=" py-10">
      <img src={imgLinks.container2} className="absolute -z-20 top-0 left-0 w-full h-full object-cover"/>
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
     
        <Badge
          variant="secondary"
          className="mb-4 rounded-full px-4 py-1.5 text-xs font-medium lg:text-sm"
        >
       <ChartIcon /> The Solution
        </Badge>
 

      {/* Title with divider lines */}
      <div className="flex items-center gap-4 mb-10 w-full">
        <span className="hidden sm:block h-1 rounded-full  flex-1 bg-[#EBEAF6]" />
        <h2 className=" text-center text-4xl font-semibold">
          The <span className="text-red-600">Qocent</span> Solution
        </h2>
        <span className="hidden sm:block h-1 rounded-full flex-1 bg-[#EBEAF6]" />
      </div>

      
    </div>
        <div className="mx-auto max-w-7xl px-6">
         
        
  
          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
              <h3 className="mb-2 text-xl font-semibold">
                Workflow Automation & Optimization.
              </h3>
              <p className="mb-6 text-sm text-[#8A6666]">
                Cut cloud costs 30–40% with AI-powered insights that show:
              </p>
  
              <ul className="mb-8 space-y-2 text-sm text-red-600">
                <li>• Which resources are burning money</li>
                <li>• Exact cost per team/project/environment</li>
              </ul>
  
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-5">
                  <div className="mb-3 h-10 w-10 rounded-lg bg-red-100 border-[#F6F1FC80] items-center flex justify-center" > <Database color="#CD0A2C"/></div>
                  <h4 className="mb-1 font-medium">Data-driven</h4>
                  <p className="text-sm text-gray-600">
                    Turn raw data into actionable insights that drive smarter
                    decisions and measurable growth.
                  </p>
                </div>
  
                <div className="rounded-xl bg-white p-5">
                <div className="mb-3 h-10 w-10 rounded-lg bg-red-100 border-[#F6F1FC80] items-center flex justify-center" ><ChartIcon /></div>

                  <h4 className="mb-1 font-medium">Efficient Growth</h4>
                  <p className="text-sm text-gray-600">
                    Work smarter, not harder. Unlock faster results and lower
                    costs with AI-powered efficiency.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Card 2 */}
            <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
              <h3 className="mb-2 text-xl font-semibold">
                One Dashboard. Every Cloud
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Stop switching between AWS, Azure Portal, GCP Console, and Huawei
                Cloud. Deploy VMs, manage VPCs, monitor resources—all from Qocent’s
                unified interface that speaks every cloud’s language.
              </p>
  
              {/* Dashboard Placeholder */}
              <div className="flex h-56 items-center justify-center rounded-xl bg-white text-sm text-gray-400">
                Dashboard Screenshot Placeholder
              </div>
            </div>
  
            {/* Card 3 */}
            <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
              <h3 className="mb-2 text-xl font-semibold">
                Link Accounts in 5 Minutes (Not 5 Days)
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                No migration. No downtime. No vendor lock-in.
              </p>
  
              {/* Cloud logos placeholder */}
              <div className="flex h-40 items-center justify-center rounded-xl bg-white text-sm text-gray-400">
                Cloud Provider Logos Placeholder
              </div>
            </div>
  
            {/* Card 4 */}
            <div className="rounded-2xl bg-[#FFEDEE] p-8 shadow-sm border-[#FFD5DC] border">
              <h3 className="mb-2 text-xl font-semibold">
                Security Score + Compliance
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Get a real-time security score across all your clouds. Catch
                misconfigurations before auditors do.
              </p>
  
              <ul className="mb-6 space-y-2 text-sm text-red-600">
                <li>• Threat detection with instant email alerts</li>
                <li>
                  • Role-Based Access Control for multiple users accessing the
                  same cloud environment
                </li>
              </ul>
  
              {/* Security score placeholder */}
              <div className="flex items-center justify-between rounded-xl bg-white p-5">
                <div>
                 <div className="flex items-center  gap-2"><div className="bg-[#FAF7F7] items-center  justify-center flex rounded-full size-10"><Padlock /></div><p className="text-sm text-gray-500">Security Score</p></div>
                  <div className="mt-2 h-20 w-100 rounded-lg bg-gray-100">
                    <div className="h-full w-[88%] rounded-lg bg-black" />
                  </div>
                </div>
                <span className="text-3xl font-semibold">88%</span>
              </div>
            </div>
          </div>
  
          {/* Footer tags */}
          <div className="mt-14 flex flex-wrap justify-center gap-3 text-sm">
            {[
              "Starter Packs",
              "Cost Optimization",
              "Security Analysis",
              "Scalable Solutions",
              "Real-Time Insights",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-white px-4 py-1 text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }
  