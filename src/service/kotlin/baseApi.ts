import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";

export const kotlinBaseApi = createApi({
  reducerPath: "kotlinBaseApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [
    ApiEnums.Site,
    ApiEnums.House,
    ApiEnums.Room,
    ApiEnums.Resource,
    ApiEnums.Service,
    ApiEnums.Config,
    ApiEnums.ActivityLog,
  ],
  endpoints: () => ({}),
});
