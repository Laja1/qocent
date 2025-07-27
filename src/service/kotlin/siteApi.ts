import { createApi } from "@reduxjs/toolkit/query/react";
import type { genericResponse } from "@/models/response";
import type {  getResourcesInSiteResponse, getResourceSummaryResponse, getSiteAllResponse, getSiteArchitectureResponse, resourceDataFlowResponse,  } from "@/models/response/siteResponse";
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
  getSiteDataFlow:build.query<resourceDataFlowResponse, {siteCode:string}>({
    query: ({siteCode}) => `/dashboard/site-data-flow/${siteCode}`,    
}),
    getAllSites: build.query<getSiteAllResponse, void>({
        query: () => `/dashboard/sites`,    
    }),
    getResourcesInSite: build.query<getResourcesInSiteResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/resource-list/${siteCode}`,    
  }),
    
  }),
});


export const { useCreateServerSiteMutation,useGetResourcesInSiteQuery, useGetSiteDataFlowQuery,useGetResourceTypeCountQuery,useGetSiteArchitectureQuery,useGetAllSitesQuery
 } = kotlinSiteApi;