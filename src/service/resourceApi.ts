/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import type { ParameterResponse } from "@/models/response/siteResponse";
import { createResourceProviderTags } from "@/utilities/tagHelpers";
import type { formResponse, resourceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";


export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Resource],
  endpoints: (build) => ({
    createResource: build.mutation<ParameterResponse, createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Resource, id: "LIST" }],
    }),
    getResourceTemplate: build.query<ParameterResponse, {resource:string}>({
        query: ({resource}) => `/resource/template/${resource}`,    
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
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourceByProviderQuery,
  useGetResourceTemplateQuery,
  useGetFormOptionsMutation
} = resourceApi;
