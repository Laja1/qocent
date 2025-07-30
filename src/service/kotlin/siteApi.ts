import { createApi } from "@reduxjs/toolkit/query/react";
import type {  getResourcesInSiteResponse, getResourceSummaryResponse, getSiteAllResponse, getSiteArchitectureResponse, resourceDataFlowResponse, SiteResponse,  } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { createSiteRequest } from "@/models/request/siteRequest";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Site],
  endpoints: (build) => ({
    createServerSite: build.mutation<SiteResponse, createSiteRequest>({
      query: (body) => ({
        url: "/resource/create-site",
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
 } = siteApi;