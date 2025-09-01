export type activityLogResponse = {
  data: activityLogData[];
  responseCode: string;
  responseMessage: string;
}

export type activityLogData = {
  activityLogAction: string;
  activityLogCreatedAt: string;
  activityLogDescription: string;
  activityLogId: number;
  activityLogIsRead: string;
  activityLogModule: string;
  activityLogStatus: string;
  activityLogUpdatedAt: string;
  activityLogUserId: number;
}
