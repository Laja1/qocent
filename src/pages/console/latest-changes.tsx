import { Clock } from "lucide-react";

interface TimelineItem {
  timestamp: string;
  description: string;
  color?: "gray" | "green" | "blue" | "red" | "yellow";
}

const timelineItems: TimelineItem[] = [
  {
    timestamp: "5 mins ago",
    description: "Deployed a new server instance to AWS US-East-1.",
    color: "gray",
  },
  {
    timestamp: "1 hour ago",
    description: "Auto-scaled 2 new compute nodes on Azure.",
    color: "gray",
  },
  {
    timestamp: "3 hours ago",
    description: "Updated firewall rules for GCP project: prod-env-main.",
    color: "gray",
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-500 border-green-300";
    case "blue":
      return "bg-blue-500 border-blue-300";
    case "red":
      return "bg-red-500 border-red-300";
    case "yellow":
      return "bg-yellow-500 border-yellow-300";
    default:
      return "bg-gray-500 border-gray-300";
  }
};

export const LatestChanges = () => {
  return (
    <div className="space-y-4">
      <div className=" text-black rounded-sm inline-flex flex-col border">
    
          
          <div className=" p-2 flex gap-2 items-center   border-b border-gray-200">
          <Clock size={16} className="text-green-900" />
          <p className="text-green-900   text-sm font-semibold">
            Latest Changes
          </p>
          </div>
        

        <div className="relative p-2">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative flex items-start pb-4">
              {/* Timeline line */}
              {index < timelineItems.length - 1 && (
                <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-900"></div>
              )}

              <div
                className={`relative z-10 w-4 h-4 rounded-full border-2 ${getColorClasses(
                  item.color || "gray"
                )} mr-4 mt-1 flex-shrink-0`}
              >
                <div className="absolute inset-1 rounded-full bg-white/20"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-[10px] text-black">{item.timestamp}</p>
                <p className="text-custom-white text-sm line-clamp-2 hover:underline hover:text-custom-primary cursor-pointer">
                  {item.description.includes("prod-env-main") ? (
                    <>Updated firewall rules for GCP project:.</>
                  ) : (
                    item.description
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
