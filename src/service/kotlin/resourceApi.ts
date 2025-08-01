/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type {ConfigResponse, createResourceResponse, } from "@/models/response/resourceResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import type { ParameterResponse } from "@/models/response/siteResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import { createConfigTags } from "@/utilities/tagHelpers";


export const kotlinResourceApi = createApi({
  reducerPath: "kotlinResourceApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Resource,ApiEnums.Config],
  endpoints: (build) => ({
     

getConfig: build.query<ConfigResponse, { serviceId: string, configProvider: string }>({
  query: ({ serviceId, configProvider }) => `/configs/read/${configProvider}/${serviceId}`,
  providesTags: (result) => createConfigTags({ data: result ? [result as any] : [] }, "configId"),
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

  useGetConfigQuery,
  useGetResourceTemplateQuery,
  useCreateResourceMutation
} = kotlinResourceApi;
