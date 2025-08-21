import { Button } from "@/components/shared";
import { CardContent } from "@/components/ui/card";
import { AlarmClockCheck, ChevronRight } from "lucide-react";

export const LatestChanges = () => {
  return (
    <div className="rounded-xs border ">
      <div className="p-2 border-b flex gap-2 border-gray-200 items-center">
        <div className="bg-red-50 border border-red-500 text-[10px] rounded-full p-1">
          <AlarmClockCheck className="text-red-800 size-3" />
        </div>
        <h3 className="text-sm  font-semibold text-black dark:text-white">Activity</h3>
      </div>
      <CardContent className="p-3">
        <div className="space-y-3">
          {[
            {
              event: "Instance deployed",
              location: "us-east-1",
              time: "5m ago",
              color: "bg-black",
            },
            {
              event: "Auto-scaled cluster",
              location: "eu-west-1",
              time: "1h ago",
              color: "bg-black",
            },
            {
              event: "Backup completed",
              location: "ap-south-1",
              time: "3h ago",
              color: "bg-black",
            },
          ].map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div
                className={`h-2 w-2 rounded-full  ${activity.color} mt-1.5 flex-shrink-0`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium dark:text-white">{activity.event}</p>
                <p className="text-xs text-black dark:text-white">
                  {activity.location} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          label="View all"
          size="small"
          intent="secondary"
          className="w-full justify-between mt-4 text-sm"
          surfixIcon={<ChevronRight className="h-3 w-3" />}
        />
      </CardContent>
    </div>
  );
};
