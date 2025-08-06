import { createApi } from "@reduxjs/toolkit/query/react";
import type {  getResourcesInSiteResponse, getResourceSummaryResponse, getSiteArchitectureResponse, getSiteResponse, resourceDataFlowResponse, SiteResponse,  } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { createSiteRequest } from "@/models/request/siteRequest";
import { createSiteProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Site],
  endpoints: (build) => ({
    createServerSite: build.mutation<SiteResponse, createSiteRequest>({
      query: (body) => ({
        url: "/site/create-site",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    deleteSite: build.mutation<genericResponse, {siteId:number}>({
      query: ({siteId}) => ({
        url: `/site/delete/${siteId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    getSiteArchitecture: build.query<getSiteArchitectureResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/site-architecture/${siteCode}`,    
    }),
    getSiteByProvider: build.query<getSiteResponse, {provider:string,siteAccountId:string}>({
      query: ({provider,siteAccountId}) => `/site/read-by-site-account-id/${siteAccountId}/${provider}`,    
      providesTags: (result) => createSiteProviderTags(result,  "siteId"),
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
    getAllSites: build.query<getSiteResponse, void>({
        query: () => `/dashboard/sites`,    
    }),
    getResourcesInSite: build.query<getResourcesInSiteResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/resource-list/${siteCode}`,  
      
  }),
    
  
  }),
});


export const { useCreateServerSiteMutation,useDeleteSiteMutation, useGetSiteByProviderQuery,useGetResourcesInSiteQuery, useGetSiteDataFlowQuery,useGetResourceTypeCountQuery,useGetSiteArchitectureQuery,useGetAllSitesQuery
 } = siteApi;