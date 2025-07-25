/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import type { ParameterResponse } from "@/models/response/siteResponse";
import { createResourceProviderTags } from "@/utilities/tagHelpers";
import type { createResourceResponse, formResponse, getResourceConfigResponse, resourceResponse, serviceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest, } from "@/models/request/resourceRequest";


export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Resource],
  endpoints: (build) => ({
    createResource: build.mutation<createResourceResponse
    , createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
    getResourceTemplate: build.query<ParameterResponse, {resource:string,provider:string}>({
        query: ({resource,provider}) => `/resource/template/${provider}/${resource}`,    
    }),
    getResourceByProvider: build.query<resourceResponse, { provider: string | null,resource:string }>({
      query: ({ provider,resource }) => `/resource/${provider}/${resource}`, 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId"),
    }),
    getFormOptions: build.mutation<formResponse, {query: string}>({
      query: (body) => ({
        url: "/form/options",
        method: "POST",
        body,
    }),
    
    }),
    getConfig: build.query<getResourceConfigResponse, { serviceId: string,configProvider:string }>({
      query: ({serviceId,configProvider}) => `/resource/config/${serviceId}/${configProvider}`,    
    }),
    
  getServices:build.query<serviceResponse, {provider:string}>({
    query: ({provider}) => `/resource/${provider}/get-serviceList`,    
}),
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourceByProviderQuery,
  useGetResourceTemplateQuery,
  useGetFormOptionsMutation,
  useGetServicesQuery,
  useGetConfigQuery
} = resourceApi;
