import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import type {  ParameterResponse, siteResponse } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Site],
  endpoints: (build) => ({
    createServerSite: build.mutation<genericResponse, void>({
      query: (body) => ({
        url: "/site/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    getSite: build.query<siteResponse, void>({
      query: () => `/api/site`,    
    }),
    getSiteParameter: build.query<ParameterResponse, void>({
      query: () => `/resource/template/serverSite`,    
     
  }),
  }),
});

export const { useCreateServerSiteMutation,useGetSiteParameterQuery } = siteApi;