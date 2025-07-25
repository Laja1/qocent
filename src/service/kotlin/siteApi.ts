import { createApi } from "@reduxjs/toolkit/query/react";
import type { genericResponse } from "@/models/response";
import type {  getResourceSummaryResponse, getSiteAllResponse, getSiteArchitectureResponse,  } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";

export const kotlinSiteApi = createApi({
  reducerPath: "kotlinSiteApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Site],
  endpoints: (build) => ({
    createServerSite: build.mutation<genericResponse, void>({
      query: (body) => ({
        url: "/site/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    getSiteArchitecture: build.query<getSiteArchitectureResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/site-architecture/${siteCode}`,    
    }),
    getSiteBySiteCode: build.query<getSiteArchitectureResponse, {siteCode:string}>({
        query: ({siteCode}) => `/dashboard/site-data/${siteCode}`,    
      }),
    getResourceTypeCount: build.query<getResourceSummaryResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/read-resource-type-count/${siteCode}`,    
  }),
    getAllSites: build.query<getSiteAllResponse, void>({
        query: () => `/dashboard/sites`,    
    }),
  }),
});


export const { useCreateServerSiteMutation,useGetResourceTypeCountQuery,useGetSiteArchitectureQuery,useGetAllSitesQuery
 } = kotlinSiteApi;