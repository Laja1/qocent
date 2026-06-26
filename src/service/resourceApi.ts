/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEnums } from "@/utilities/enums";
import type {ConfigResponse, consoleSummaryResponse, createResourceResponse, resourceResponse, } from "@/models/response/resourceResponse";
import type { ParameterResponse } from "@/models/response/siteResponse";
import type { createResourceRequest, createStaterPackRequest } from "@/models/request/resourceRequest";
import { createConfigTags, createResourceProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";
import { kotlinBaseApi } from "./kotlinBaseApi";
import {
  KotlinConfigEndpoints,
  KotlinResourceEndpoints,
  kotlinPath,
} from "./endpoints";

export const kotlinResourceApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
     

getConfig: build.query<ConfigResponse, { serviceId: string, configProvider: string }>({
  query: ({ serviceId, configProvider }) =>
    kotlinPath(KotlinConfigEndpoints.readByProviderAndService, {
      configProvider,
      configServiceCode: serviceId,
    }),
  providesTags: (result) => createConfigTags({ data: result ? [result as any] : [] }, "configId"),
}), 
getResourceTemplate: build.query<ParameterResponse, { resource: string, provider: string }>({
    query: ({ resource, provider }) =>
      kotlinPath(KotlinResourceEndpoints.readResourceTemplate, {
        provider,
        parameterObject: resource,
      }),
    }),
    getAllResources: build.query<resourceResponse, { accountCode: string,provider:string, type: 'INTERNAL' | 'EXTERNAL' }>({
      query: ({ accountCode,provider, type }) => ({
        url: kotlinPath(KotlinResourceEndpoints.readAllResources, { accountCode, provider }),
        params: { requestType: type },
      }),
      providesTags: (result) =>
        createResourceProviderTags(
          result,
          "resourceId"
        ) as { type: ApiEnums.Resource; id: string | number | undefined }[],
    }),
    createStaterPack:build.mutation<{responseCode:string,responseMessage:string,data:Record<any, any>}, createStaterPackRequest>({
      query: (body) => ({
        url: KotlinResourceEndpoints.createStarterPack,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" },{ type: ApiEnums.House, id: "LIST" }],
    }),
    createResource: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: KotlinResourceEndpoints.create,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" },{ type: ApiEnums.Site, id: "LIST" }],
    }),
    deleteResource:build.mutation<genericResponse,{resourceId:number}>({
      query:({resourceId})=>({
        url: kotlinPath(KotlinResourceEndpoints.deleteResource, { resourceId }),
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" },{ type: ApiEnums.Site, id: "LIST" },],
    }),
    deleteResourceByCode:build.mutation<genericResponse,{resourceCode:string}>({
      query:({resourceCode})=>({
        url: kotlinPath(KotlinResourceEndpoints.deleteResourceByCode, { resourceCode }),
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" }],
    }),
    consoleSummary:build.query<consoleSummaryResponse,void>({
      query:()=> KotlinResourceEndpoints.consoleSummary,
    }),
    consoleSummaryForSite: build.query<{ responseCode: string; responseMessage: string; data?: any }, { siteCode: string }>({
      query: ({ siteCode }) =>
        kotlinPath(KotlinResourceEndpoints.consoleSummaryForSite, { siteCode }),
    }),
    readResourceByProvider: build.query<
      { responseCode: string; responseMessage: string; data?: any },
      { serviceCode: string; configProvider: string }
    >({
      query: ({ serviceCode, configProvider }) =>
        kotlinPath(KotlinResourceEndpoints.configByProvider, { serviceCode, configProvider }),
    }),
    updateResourcesTerraform: build.mutation<genericResponse, Record<string, any>>({
      query: (body) => ({
        url: KotlinResourceEndpoints.terraformUpdateWebhook,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
    viewPendingResources: build.mutation<
      { responseCode: string; responseMessage: string; data?: any },
      { siteCode: string }
    >({
      query: ({ siteCode }) => ({
        url: kotlinPath(KotlinResourceEndpoints.viewPendingResources, { siteCode }),
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetConfigQuery,
  useGetAllResourcesQuery,
  useGetResourceTemplateQuery,
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useCreateStaterPackMutation,
  useDeleteResourceByCodeMutation,
  useConsoleSummaryQuery,
  useConsoleSummaryForSiteQuery,
  useReadResourceByProviderQuery,
  useUpdateResourcesTerraformMutation,
  useViewPendingResourcesMutation,
} = kotlinResourceApi;
