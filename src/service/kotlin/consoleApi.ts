/* eslint-disable @typescript-eslint/no-explicit-any */
import {  createActivityLogTags } from "@/utilities/tagHelpers"
import type { activityLogResponse } from "@/models/response/consoleResponse";
import { kotlinBaseApi } from "./baseApi";
import { KotlinActivityLogEndpoints } from "./endpoints";

export const consoleApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getActivityLog: build.query<activityLogResponse,void>({
      query: () => KotlinActivityLogEndpoints.read, 
      providesTags: (result) => createActivityLogTags(result,  "activityLogId"),
    }),

  }),
});

export const {
  useGetActivityLogQuery,
} = consoleApi;
