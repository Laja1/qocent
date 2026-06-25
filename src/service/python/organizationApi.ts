import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { OrganizationResponse, OrganizationWithAccountsResponse } from "@/models/response/organizationResponse";

const controller = 'org'
export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Site],
  endpoints: (build) => ({
    getMyOrganizations:build.query<OrganizationResponse, void>({
        query: () => `/${controller}/me`,
      }),

    getUserAccountsByProvider:build.query<OrganizationWithAccountsResponse, {provider:string}>({
        query: ({provider}) => `/${controller}/${provider}/accounts`,
        providesTags: [{ type: ApiEnums.Site, id: "LIST" }],
      }),
  })
});

export const {
    useGetMyOrganizationsQuery,
    useGetUserAccountsByProviderQuery,
} = organizationApi;
