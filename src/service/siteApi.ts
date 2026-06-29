/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  getResourcesResponse,
  getSiteArchitectureResponse,
  getSiteResponse,
  resourceDataFlowResponse,
  SiteResponse,
} from "@/models/response/siteResponse";
import type { createSiteRequest } from "@/models/request/siteRequest";
import { ApiEnums } from "@/utilities/enums";
import { createResourceProviderTags, createSiteProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";
import { siteStore } from "@/store/siteSlice";
import { kotlinBaseApi } from "./kotlinBaseApi";
import {
  KotlinDashboardEndpoints,
  KotlinSiteEndpoints,
  kotlinPath,
} from "./endpoints";

type AnyBody = Record<string, any>;
type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const siteApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createServerSite: build.mutation<SiteResponse, createSiteRequest>({
      query: (body) => ({ url: KotlinSiteEndpoints.createSite, method: "POST", body }),
      invalidatesTags: [
        { type: ApiEnums.Site, id: "LIST" },
        { type: ApiEnums.ActivityLog, id: "LIST" },
      ],
    }),
    deleteSite: build.mutation<genericResponse, { siteId: number }>({
      query: ({ siteId }) => ({
        url: kotlinPath(KotlinSiteEndpoints.deleteSite, { siteId }),
        method: "POST",
      }),
      invalidatesTags: [
        { type: ApiEnums.Site, id: "LIST" },
        { type: ApiEnums.ActivityLog, id: "LIST" },
      ],
    }),
    addSiteKey: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinSiteEndpoints.addKey, method: "POST", body }),
    }),
    createHuaweiAccount: build.mutation<SiteResponse, AnyBody>({
      query: (body) => ({ url: KotlinSiteEndpoints.createHuaweiAccount, method: "POST", body }),
    }),
    generateHuaweiOtp: build.mutation<AnyResp, AnyBody>({
      query: (body) => ({ url: KotlinSiteEndpoints.createHuaweiOtp, method: "POST", body }),
    }),
    getSiteArchitecture: build.query<getSiteArchitectureResponse, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.siteArchitecture, { siteCode }),
      providesTags: [
        { type: ApiEnums.Site, id: "LIST" },
        { type: ApiEnums.House, id: "LIST" },
        { type: ApiEnums.Resource, id: "LIST" },
      ],
    }),
    getSiteByProvider: build.query<
      getSiteResponse,
      { provider: string; siteAccountId: string; type: string }
    >({
      query: ({ provider, siteAccountId, type }) => ({
        url: kotlinPath(KotlinSiteEndpoints.readSiteByAccountIdAndProvider, {
          siteAccountId,
          siteProvider: provider,
        }),
        params: { requestType: type },
      }),
      providesTags: (result) => createSiteProviderTags(result, "siteId"),
      async onQueryStarted({ provider, siteAccountId }, { queryFulfilled, dispatch }) {
        try {
          console.log("Fetching site:", provider, siteAccountId);
          const { data } = await queryFulfilled;
          if (Array.isArray(data?.data) && data.data.length > 0) {
            dispatch(siteStore.action.setSiteDetails(data.data));
          } else {
            dispatch(siteStore.action.setSiteDetails([]));
          }
        } catch (err) {
          console.error("Error fetching site by provider:", err);
        }
      },
    }),
    getSiteBySiteCode: build.query<getSiteArchitectureResponse, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.siteData, { siteCode }),
    }),
    getSiteDataFlow: build.query<resourceDataFlowResponse, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinSiteEndpoints.readArchitecture, { siteCode }),
      providesTags: [
        { type: ApiEnums.Site, id: "LIST" },
        { type: ApiEnums.House, id: "LIST" },
        { type: ApiEnums.Resource, id: "LIST" },
      ],
    }),
    getResourcesInSite: build.query<getResourcesResponse, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.readResourceList, { siteCode }),
      providesTags: (result) =>
        createResourceProviderTags(result, "resourceId") as Array<{
          type: ApiEnums.Resource;
          id: string | number | "LIST";
        }>,
    }),
  }),
});

export const {
  useCreateServerSiteMutation,
  useDeleteSiteMutation,
  useAddSiteKeyMutation,
  useCreateHuaweiAccountMutation,
  useGenerateHuaweiOtpMutation,
  useGetSiteByProviderQuery,
  useGetResourcesInSiteQuery,
  useGetSiteDataFlowQuery,
  useGetSiteArchitectureQuery,
  useGetSiteBySiteCodeQuery,
} = siteApi;
