import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQuery } from "../httpClient/baseQuery";
import type { OrganizationResponse, OrganizationWithAccountsResponse } from "@/models/response/organizationResponse";
import type { organizationAccountRequest } from "@/models/request/ogranizationRequest";


const controller = 'org'
export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQuery,
  tagTypes:[ApiEnums.Auth,ApiEnums.Member],
  endpoints: (build) => ({
    getOrganization:build.query<OrganizationResponse, void>({
        query: () => `/${controller}/me`,
      }),
      getOrganizationAccount:build.query<OrganizationWithAccountsResponse, organizationAccountRequest>({
        query: ({org_id}) => `/${controller}/${org_id}/accounts`,
      }),
    // signIn: build.mutation<signInResponse, signInRequest>({
    //   query: (body) => ({
    //     url: "/login",
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
    })
});

export const {
    useGetOrganizationQuery,
    useGetOrganizationAccountQuery,
} = organizationApi;
