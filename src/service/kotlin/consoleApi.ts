/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import {  createActivityLogTags } from "@/utilities/tagHelpers"
import type { activityLogResponse } from "@/models/response/consoleResponse";

export const consoleApi = createApi({
  reducerPath: "consoleApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.ActivityLog],
  endpoints: (build) => ({
    getActivityLog: build.query<activityLogResponse,void>({
      query: () => `/activity-log/read`, 
      providesTags: (result) => createActivityLogTags(result,  "activityLogId"),
    }),

  }),
});

export const {
  useGetActivityLogQuery,
} = consoleApi;
