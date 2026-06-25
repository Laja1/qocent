import type {  deploySiteResourceType, getResourcesResponse, getResourceSummaryResponse, getSiteArchitectureResponse, getSiteResponse, resourceDataFlowResponse, SiteResponse,  } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";
import type { createSiteRequest } from "@/models/request/siteRequest";
import { createResourceProviderTags, createSiteProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";
import { siteStore } from "@/store/siteSlice";
import { kotlinBaseApi } from "./baseApi";
import {
  KotlinDashboardEndpoints,
  KotlinResourceEndpoints,
  KotlinSiteEndpoints,
  kotlinPath,
} from "./endpoints";

export const siteApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createServerSite: build.mutation<SiteResponse, createSiteRequest>({
      query: (body) => ({
        url: KotlinSiteEndpoints.createsite,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    deleteSite: build.mutation<genericResponse, {siteId:number}>({
      query: ({siteId}) => ({
        url: kotlinPath(KotlinSiteEndpoints.deletesite, { siteId }),
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    getSiteArchitecture: build.query<getSiteArchitectureResponse, {siteCode:string}>({
      query: ({siteCode}) => kotlinPath(KotlinDashboardEndpoints.getsitearchitecture, { siteCode }),
      providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
    }),
    getSiteByProvider: build.query<
    getSiteResponse,
    { provider: string; siteAccountId: string; type: string }
  >({
    query: ({ provider, siteAccountId, type }) => ({
      url: kotlinPath(KotlinSiteEndpoints.readsitebysitecodeandprovider, {
        siteAccountId,
        siteProvider: provider,
      }),
      params: { requestType: type },
    }),
    providesTags: (result) => createSiteProviderTags(result, "siteId"),  
    async onQueryStarted({ provider, siteAccountId }, { queryFulfilled, dispatch }) {
      try {
        console.log("Fetching site:", provider, siteAccountId);
  
        const { data } = await queryFulfilled; 
        
        if (Array.isArray(data?.data) && data.data.length > 0) {
          dispatch(siteStore.action.setSiteDetails(data.data));
        } else {
          dispatch(siteStore.action.setSiteDetails([]));
        }
      } catch (err) {
        console.error("Error fetching site by provider:", err);
      }
    },
  }),
  
    getSiteBySiteCode: build.query<getSiteArchitectureResponse, {siteCode:string}>({
        query: ({siteCode}) => kotlinPath(KotlinDashboardEndpoints.readsitedata, { siteCode }),    
      }),
    getResourceTypeCount: build.query<getResourceSummaryResponse, {siteCode:string}>({
      query: ({siteCode}) => kotlinPath(KotlinDashboardEndpoints.readresourcetypecount, { siteCode }),    
  }),
  getSiteDataFlow: build.query<resourceDataFlowResponse, { siteCode: string }>({
    query: ({ siteCode }) => kotlinPath(KotlinSiteEndpoints.readarchitecture, { siteCode }),
    providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
  }),
  getAllSites: build.query<getSiteResponse, void>({
    query: () => KotlinDashboardEndpoints.readallsites,
    providesTags: (result) => createSiteProviderTags(result, "siteId"),
    }),
    getResourcesInSite: build.query<getResourcesResponse, {siteCode:string}>({
      query: ({siteCode}) => kotlinPath(KotlinDashboardEndpoints.readresourcelist, { siteCode }), 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
  }),
  deploySiteResources: build.mutation<deploySiteResourceType, {siteCode:string}>({
    query: ({siteCode}) => ({
      url: kotlinPath(KotlinResourceEndpoints.deployresources, { siteCode }),
      method: "POST",
    }),
    invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }], 
}),
  }),
});


export const { useCreateServerSiteMutation,useDeleteSiteMutation,useDeploySiteResourcesMutation, useGetSiteByProviderQuery,useGetResourcesInSiteQuery, useGetSiteDataFlowQuery,useGetResourceTypeCountQuery,useGetSiteArchitectureQuery,useGetAllSitesQuery
 } = siteApi;
