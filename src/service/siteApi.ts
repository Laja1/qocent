import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithResponseCodeHandling } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import type { createSiteRequest } from "@/models/request/siteRequest";
import type { GetSiteListResponse } from "@/models/response/siteResponse";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: baseQueryWithResponseCodeHandling,
  endpoints: (build) => ({
    createServerSite: build.mutation<genericResponse, createSiteRequest>({
      query: (body) => ({
        url: "/site/create",
        method: "POST",
        body: body,
      }),
    }),
    getSites: build.query<GetSiteListResponse, void>({
      query: () => "/site/read",
    }),
  }),
});

export const { useCreateServerSiteMutation, useGetSitesQuery } = siteApi;
