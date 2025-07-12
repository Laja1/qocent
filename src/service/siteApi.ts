import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithResponseCodeHandling } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import type { createSiteRequest } from "@/models/request/siteRequest";
import type { GetSiteListResponse } from "@/models/response/siteResponse";
import { ApiEnums } from "@/utilities/enums";


export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: baseQueryWithResponseCodeHandling,
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
    getSites: build.query<GetSiteListResponse, {userId:number|null}>({
      query: ({userId}) => `/site/read-by-site-user-id/${userId}`,
      providesTags: (result) =>
        result?.data
          ? [
              { type: ApiEnums.Site, id: "LIST" },
              ...result.data.map((site) => ({
                type: ApiEnums.Site,
                id: site.siteId,
              })),
            ]
          : [{ type: ApiEnums.Site, id: "LIST" }],
    }),
  }),
});

export const { useCreateServerSiteMutation, useGetSitesQuery } = siteApi;
