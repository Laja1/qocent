import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { baseQueryWithAuthGuard } from "./httpClient/baseQuery";
import type { UpdateOrganizationRequest } from "@/models/request/organizationRequest";
import type {
  OrganizationResponse,
  OrgWithAccountAPIResponse,
} from "@/models/response/organizationResponse";

const controller = "org";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Auth, ApiEnums.Site],
  endpoints: (build) => ({
    getMyOrganizations: build.query<
      OrganizationResponse,
      { provider?: string | null } | void
    >({
      query: (arg) => ({
        url: `/${controller}/me`,
        params: arg?.provider ? { provider: arg.provider } : undefined,
      }),
      providesTags: [{ type: ApiEnums.Site, id: "ORGS" }],
    }),

    getOrganization: build.query<OrgWithAccountAPIResponse, string>({
      query: (org_id) => `/${controller}/${org_id}`,
      providesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),

    renameOrganization: build.mutation<
      OrganizationResponse,
      { org_id: string; body: UpdateOrganizationRequest }
    >({
      query: ({ org_id, body }) => ({
        url: `/${controller}/${org_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Site, id: "ORGS" }],
    }),
  }),
});

export const {
  useGetMyOrganizationsQuery,
  useGetOrganizationQuery,
  useRenameOrganizationMutation,
} = organizationApi;
