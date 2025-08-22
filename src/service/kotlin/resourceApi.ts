/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type {ConfigResponse, createResourceResponse, resourceResponse, } from "@/models/response/resourceResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { ParameterResponse } from "@/models/response/siteResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import { createConfigTags, createResourceProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";


export const kotlinResourceApi = createApi({
  reducerPath: "kotlinResourceApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Resource,ApiEnums.Config,ApiEnums.House,ApiEnums.Room],
  endpoints: (build) => ({
     

getConfig: build.query<ConfigResponse, { serviceId: string, configProvider: string }>({
  query: ({ serviceId, configProvider }) => `/configs/read/${configProvider}/${serviceId}`,
  providesTags: (result) => createConfigTags({ data: result ? [result as any] : [] }, "configId"),
}), 
getResourceTemplate: build.query<ParameterResponse, { resource: string, provider: string }>({
    query: ({ resource, provider }) => `/resource/template/${provider}/${resource}`,
    }),
    getAllResources: build.query<resourceResponse, { accountCode: string }>({
      query: ({ accountCode }) => `/resource/read-all-resources/${accountCode}`,
      providesTags: (result) =>
        createResourceProviderTags(
          result,
          "resourceId"
        ) as { type: ApiEnums.Resource; id: string | number | undefined }[],
    }),
    createResource: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" },{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.Room, id: "LIST" }],
    }),
    deleteResource:build.mutation<genericResponse,{resourceId:number}>({
      query:({resourceId})=>({
        url: `/resource/delete-resource/${resourceId}`,
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
    deleteResourceByCode:build.mutation<genericResponse,{resourceCode:string}>({
      query:({resourceCode})=>({
        url: `/resource/delete-resource-by-code/${resourceCode}`,
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
  }),
});

export const {

  useGetConfigQuery,
  useGetAllResourcesQuery,
  useGetResourceTemplateQuery,
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useDeleteResourceByCodeMutation
} = kotlinResourceApi;
