import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import type { createSiteRequest } from "@/models/request/siteRequest";
import type { GetSiteListResponse } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Site],
  endpoints: (build) => ({
    createServerSite: build.mutation<genericResponse, createSiteRequest>({
      query: (body) => ({
        url: "/site/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    getSites: build.query<GetSiteListResponse, { provider: string; userId: number }>({
      query: ({ provider, userId }) => `/site/read-by-site-provider/${provider}/${userId}`,    
      providesTags: (result) =>
        result?.data
          ? [
              { type: ApiEnums.Site, id: "LIST" } as const,
              ...result.data.map((site) => ({
                type: ApiEnums.Site as const,
                id: site.siteId,
              })),
            ]
          : [{ type: ApiEnums.Site, id: "LIST" } as const],
    }),
  }),
});

export const { useCreateServerSiteMutation, useGetSitesQuery,useLazyGetSitesQuery } = siteApi;