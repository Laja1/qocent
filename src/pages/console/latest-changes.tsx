import { Button } from "@/components/shared";
import { CardContent } from "@/components/ui/card";
import { AlarmClockCheck, ChevronRight, Loader2 } from "lucide-react";
import { useGetActivityLogQuery } from "@/service/kotlin/consoleApi";
import type { activityLogData } from "@/models/response/consoleResponse";

const statusColorMap: Record<string, string> = {
  SUCCESS: "bg-green-500",
  FAILED: "bg-red-500",
  PENDING: "bg-yellow-500",
  INFO: "bg-blue-500",
};

export const LatestChanges = () => {
  const { data, isLoading } = useGetActivityLogQuery();

  const logs: activityLogData[] = data?.data ?? [];

  return (
    <div className="rounded-md border shadow-sm">
      {/* Header */}
      <div className="p-2 border-b flex gap-2 border-gray-200 items-center">
        <div className="bg-red-50 border border-red-500 text-[10px] rounded-full p-1">
          <AlarmClockCheck className="text-red-800 size-3" />
        </div>
        <h3 className="text-sm font-semibold text-black dark:text-white">
          Activity
        </h3>
      </div>

      <CardContent className="p-3">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin text-gray-500 h-5 w-5" />
          </div>
        ) : logs.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No recent activity
          </p>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 5).map((activity) => (
              <div
                key={activity.activityLogId}
                className="flex gap-3 items-start"
              >
                <div
                  className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    statusColorMap[activity.activityLogStatus] ?? "bg-gray-400"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium dark:text-white truncate">
                    {activity.activityLogAction}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {activity.activityLogDescription}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {new Date(activity.activityLogCreatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View all button */}
        {logs.length > 0 && (
          <Button
            label="View all"
            size="small"
            intent="secondary"
            className="w-full justify-between mt-4 text-sm"
            surfixIcon={<ChevronRight className="h-3 w-3" />}
          />
        )}
      </CardContent>
    </div>
  );
};
