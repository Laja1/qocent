/* eslint-disable @typescript-eslint/no-explicit-any */
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinDashboardEndpoints, kotlinPath } from "./endpoints";
import { ApiEnums } from "@/utilities/enums";

type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const dashboardApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    readAllSites: build.query<AnyResp, void>({
      query: () => KotlinDashboardEndpoints.sites,
      providesTags: [{ type: ApiEnums.Site, id: "LIST" }],
    }),
    readErrorLogs: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.readErrorLogs, { siteCode }),
    }),
    readResourceTypeCount: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) =>
        kotlinPath(KotlinDashboardEndpoints.readResourceTypeCount, { siteCode }),
    }),
    readServerParameters: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) =>
        kotlinPath(KotlinDashboardEndpoints.readServerParameters, { siteCode }),
    }),
    readSiteArchitectureSummary: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) =>
        kotlinPath(KotlinDashboardEndpoints.siteArchitectureSummary, { siteCode }),
    }),
    readSiteDataflow: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.siteDataFlow, { siteCode }),
    }),
    readResourcesByServerHouse: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) =>
        kotlinPath(KotlinDashboardEndpoints.siteServerHouses, { siteCode }),
    }),
    readResourcesByServerRoom: build.query<AnyResp, { siteCode: string }>({
      query: ({ siteCode }) => kotlinPath(KotlinDashboardEndpoints.siteServerRooms, { siteCode }),
    }),
  }),
});

export const {
  useReadAllSitesQuery,
  useReadErrorLogsQuery,
  useReadResourceTypeCountQuery,
  useReadServerParametersQuery,
  useReadSiteArchitectureSummaryQuery,
  useReadSiteDataflowQuery,
  useReadResourcesByServerHouseQuery,
  useReadResourcesByServerRoomQuery,
} = dashboardApi;
