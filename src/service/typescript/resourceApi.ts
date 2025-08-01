/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";
import { createResourceProviderTags } from "@/utilities/tagHelpers";
import type { resourceResponse } from "@/models/response/resourceResponse";


export const resourceApi = createApi({
  reducerPath: "resourceApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Resource],
  endpoints: (build) => ({
 
    getResourceByProvider: build.query<resourceResponse, { provider: string | null,resource:string }>({
      query: ({ provider,resource }) => `/resource/${provider}/${resource}`, 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId"),
    }),
    
   

  }),
});

export const {
  useGetResourceByProviderQuery,
} = resourceApi
