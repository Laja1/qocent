/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { ParameterResponse } from "@/models/response/siteResponse";
import { createResourceProviderTags } from "@/utilities/tagHelpers";
import type { resourceResponse } from "@/models/response/resourceResponse";

export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Resource],
  endpoints: (build) => ({
    createResource: build.mutation<genericResponse, void>({
      query: (body) => ({
        url: "/house/create",
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
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourceByProviderQuery,
  useGetResourceTemplateQuery
} = resourceApi;
