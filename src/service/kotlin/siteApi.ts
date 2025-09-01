import { createApi } from "@reduxjs/toolkit/query/react";
import type {  deploySiteResourceType, getResourcesResponse, getResourceSummaryResponse, getSiteArchitectureResponse, getSiteResponse, resourceDataFlowResponse, SiteResponse,  } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { createSiteRequest } from "@/models/request/siteRequest";
import { createResourceProviderTags, createSiteProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";




export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Site,ApiEnums.House,ApiEnums.Room,ApiEnums.Resource,ApiEnums.ActivityLog],
  endpoints: (build) => ({
    createServerSite: build.mutation<SiteResponse, createSiteRequest>({
      query: (body) => ({
        url: "/site/create-site",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    deleteSite: build.mutation<genericResponse, {siteId:number}>({
      query: ({siteId}) => ({
        url: `/site/delete/${siteId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    getSiteArchitecture: build.query<getSiteArchitectureResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/site-architecture/${siteCode}`,
      providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
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
  getSiteDataFlow: build.query<resourceDataFlowResponse, { siteCode: string }>({
    query: ({ siteCode }) => `/site/read-architecture/${siteCode}`,
    providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
  }),
  getAllSites: build.query<getSiteResponse, void>({
    query: () => `/dashboard/sites`,
    providesTags: (result) => createSiteProviderTags(result, "siteId"),
    }),
    getResourcesInSite: build.query<getResourcesResponse, {siteCode:string}>({
      query: ({siteCode}) => `/dashboard/resource-list/${siteCode}`, 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
  }),
  deploySiteResources: build.mutation<deploySiteResourceType, {siteCode:string}>({
    query: ({siteCode}) => ({
      url:`/resource/deploy-resources/${siteCode}`,
      method: "POST",
    }),
    invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }], 
}),
  }),
});


export const { useCreateServerSiteMutation,useDeleteSiteMutation,useDeploySiteResourcesMutation, useGetSiteByProviderQuery,useGetResourcesInSiteQuery, useGetSiteDataFlowQuery,useGetResourceTypeCountQuery,useGetSiteArchitectureQuery,useGetAllSitesQuery
 } = siteApi;