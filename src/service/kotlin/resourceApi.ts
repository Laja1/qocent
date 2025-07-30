/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type {createResourceResponse, getResourceConfigResponse, serviceResponse } from "@/models/response/resourceResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { ParameterResponse } from "@/models/response/siteResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";


export const kotlinResourceApi = createApi({
  reducerPath: "kotlinResourceApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Resource],
  endpoints: (build) => ({
     
 getServices:build.query<serviceResponse, {provider:string}>({
    query: ({provider}) => `/resource/${provider}/get-service-list`,    
}),
getConfig: build.query<getResourceConfigResponse<any>, { serviceId: string, configProvider: string }>({
    query: ({ serviceId, configProvider }) => `/resource/config/${serviceId}/${configProvider}`,
}),
getResourceTemplate: build.query<ParameterResponse, { resource: string, provider: string }>({
    query: ({ resource, provider }) => `/resource/template/${provider}/${resource}`,
    }),
    createResource: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetConfigQuery,
  useGetResourceTemplateQuery,
  useCreateResourceMutation
} = kotlinResourceApi;
