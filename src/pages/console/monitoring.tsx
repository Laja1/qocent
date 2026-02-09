import { Activity } from "lucide-react";
import { useConsoleSummaryQuery } from "@/service/kotlin/resourceApi";

export const Monitoring = () => {
  const { data: summaryData } = useConsoleSummaryQuery();
  const summary = summaryData?.data?.summary;

  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
        <div className="rounded-xs border h-fit">
          <div className="p-2 border-b flex gap-2 border-gray-200 items-center">
            <div className="bg-red-50 border border-red-500 text-[10px] rounded-full p-1">
              <Activity className="text-red-800 size-3" />
            </div>
            <h3 className="text-sm font-semibold text-black">
              Summary Tab
            </h3>
          </div>

          <div className="p-3 space-y-4">
            {[
              { service: "Compute Engine", uptime: summary?.compute ?? 0 },
              { service: "Networking", uptime: summary?.networking ?? 0 },
              { service: "Storage", uptime: summary?.storage ?? 0 },
              { service: "Database", uptime: summary?.database ?? 0 },
              { service: "Security", uptime: summary?.security ?? 0 },
              { service: "Others", uptime: summary?.others ?? 0 },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.uptime > 0 ? "bg-green-600" : "bg-yellow-600"
                    }`}
                  />
                  <span className="text-xs text-gray-900">
                    {service.service}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-900">
                  {service.uptime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
