import { Activity } from "lucide-react";

export const Monitoring = () => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
        <div className=" rounded-xs border h-fit">
          <div className="p-2 border-b flex gap-2 border-gray-200 items-center">
            <div className="bg-red-50 border border-red-500 text-[10px] rounded-full p-1">
              <Activity className="text-red-800 size-3" />
            </div>
            <h3 className="text-sm  font-semibold text-black dark:text-white">
              {" "}
              System Health
            </h3>
          </div>
          <div className="p-3 space-y-4">
            {[
              {
                service: "Compute Engine",
                status: "Operational",
                uptime: "99.9%",
              },
              {
                service: "Load Balancer",
                status: "Operational",
                uptime: "99.8%",
              },
              { service: "Database", status: "Minor Issues", uptime: "98.5%" },
              { service: "Storage", status: "Operational", uptime: "100%" },
              { service: "Storage", status: "Operational", uptime: "100%" },
              { service: "Storage", status: "Operational", uptime: "100%" },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.status === "Operational"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  />
                  <span className="text-xs text-gray-900 dark:text-white">
                    {service.service}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {service.uptime}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-600">{service.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
