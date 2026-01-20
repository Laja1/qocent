import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { OrganizationResponse, OrganizationWithAccountsResponse } from "@/models/response/organizationResponse";
import type {  UpdateOrganizationPayload, AddAccountToOrgPayload, RemoveAccountFromOrgPayload } from "@/models/request/ogranizationRequest";
import type { baseResponse } from "@/models/response";


const controller = 'org'
export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes:[ApiEnums.Auth,ApiEnums.Site],
  endpoints: (build) => ({
    getMyOrganizations:build.query<OrganizationResponse, void>({
        query: () => `/${controller}/me`,
      }),
      
    getOrganization:build.query<OrganizationResponse, string>({
        query: (org_id) => `/${controller}/${org_id}`,
      }),
      
    updateOrganization:build.mutation<baseResponse, {org_id:string, body:UpdateOrganizationPayload}>({
        query: ({org_id, body}) => ({
          url: `/${controller}/${org_id}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
      }),
      
    getUserAccountsByProvider:build.query<OrganizationWithAccountsResponse, {provider:string}>({
        query: ({provider}) => `/${controller}/${provider}/accounts`,
        providesTags: [{ type: ApiEnums.Site, id: "LIST" }],
      }),
      
    addAccountToOrganization:build.mutation<baseResponse, {org_id:string, body:AddAccountToOrgPayload}>({
        query: ({org_id, body}) => ({
          url: `/${controller}/${org_id}/account/add`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
      }),
      
    removeAccountFromOrganization:build.mutation<baseResponse, {org_id:string, body:RemoveAccountFromOrgPayload}>({
        query: ({org_id, body}) => ({
          url: `/${controller}/${org_id}/account/remove`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: [{ type: ApiEnums.Site, id: "LIST" }],
      }),

    })
});

export const {
    useGetMyOrganizationsQuery,
    useGetOrganizationQuery,
    useUpdateOrganizationMutation,
    useGetUserAccountsByProviderQuery,
    useAddAccountToOrganizationMutation,
    useRemoveAccountFromOrganizationMutation,
} = organizationApi;
