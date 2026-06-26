/* eslint-disable @typescript-eslint/no-explicit-any */
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinBusinessEndpoints, kotlinPath } from "./endpoints";
import type { genericResponse } from "@/models/response";

type AnyBody = Record<string, any>;
type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const businessApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    assignBusinessService: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinBusinessEndpoints.assignBusiness, method: "POST", body }),
    }),
    bulkCreateBusiness: build.mutation<genericResponse, AnyBody[]>({
      query: (body) => ({ url: KotlinBusinessEndpoints.bulkCreate, method: "POST", body }),
    }),
    createBusiness: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinBusinessEndpoints.create, method: "POST", body }),
    }),
    deleteBusiness: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinBusinessEndpoints.delete, method: "POST", body }),
    }),
    getBusinessLeads: build.query<AnyResp, void>({
      query: () => KotlinBusinessEndpoints.getLeads,
    }),
    getCustomerList: build.query<AnyResp, void>({
      query: () => KotlinBusinessEndpoints.getCustomerList,
    }),
    readBusinesses: build.query<AnyResp, void>({
      query: () => KotlinBusinessEndpoints.read,
    }),
    readBusinessByContactEmail: build.query<AnyResp, { businessContactEmail: string }>({
      query: ({ businessContactEmail }) =>
        kotlinPath(KotlinBusinessEndpoints.readByContactEmail, { businessContactEmail }),
    }),
    readBusinessByContactName: build.query<AnyResp, { businessContactName: string }>({
      query: ({ businessContactName }) =>
        kotlinPath(KotlinBusinessEndpoints.readByContactName, { businessContactName }),
    }),
    readBusinessByContactNumber: build.query<AnyResp, { businessContactNumber: string }>({
      query: ({ businessContactNumber }) =>
        kotlinPath(KotlinBusinessEndpoints.readByContactNumber, { businessContactNumber }),
    }),
    readBusinessByContactRole: build.query<AnyResp, { businessContactRole: string }>({
      query: ({ businessContactRole }) =>
        kotlinPath(KotlinBusinessEndpoints.readByContactRole, { businessContactRole }),
    }),
    readBusinessByCreatedAt: build.query<AnyResp, { businessCreatedAt: string }>({
      query: ({ businessCreatedAt }) =>
        kotlinPath(KotlinBusinessEndpoints.readByCreatedAt, { businessCreatedAt }),
    }),
    readBusinessByDescription: build.query<AnyResp, { businessDescription: string }>({
      query: ({ businessDescription }) =>
        kotlinPath(KotlinBusinessEndpoints.readByDescription, { businessDescription }),
    }),
    readBusinessById: build.query<AnyResp, { businessId: string | number }>({
      query: ({ businessId }) => kotlinPath(KotlinBusinessEndpoints.readById, { businessId }),
    }),
    readBusinessByName: build.query<AnyResp, { businessName: string }>({
      query: ({ businessName }) =>
        kotlinPath(KotlinBusinessEndpoints.readByName, { businessName }),
    }),
    readBusinessBySize: build.query<AnyResp, { businessSize: string }>({
      query: ({ businessSize }) =>
        kotlinPath(KotlinBusinessEndpoints.readBySize, { businessSize }),
    }),
    readBusinessByStatus: build.query<AnyResp, { businessStatus: string }>({
      query: ({ businessStatus }) =>
        kotlinPath(KotlinBusinessEndpoints.readByStatus, { businessStatus }),
    }),
    readBusinessByUpdatedAt: build.query<AnyResp, { businessUpdatedAt: string }>({
      query: ({ businessUpdatedAt }) =>
        kotlinPath(KotlinBusinessEndpoints.readByUpdatedAt, { businessUpdatedAt }),
    }),
    readBusinessByWebsite: build.query<AnyResp, { businessWebsite: string }>({
      query: ({ businessWebsite }) =>
        kotlinPath(KotlinBusinessEndpoints.readByWebsite, { businessWebsite }),
    }),
    updateBusiness: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinBusinessEndpoints.update, method: "POST", body }),
    }),
  }),
});

export const {
  useAssignBusinessServiceMutation,
  useBulkCreateBusinessMutation,
  useCreateBusinessMutation,
  useDeleteBusinessMutation,
  useGetBusinessLeadsQuery,
  useGetCustomerListQuery,
  useReadBusinessesQuery,
  useReadBusinessByContactEmailQuery,
  useReadBusinessByContactNameQuery,
  useReadBusinessByContactNumberQuery,
  useReadBusinessByContactRoleQuery,
  useReadBusinessByCreatedAtQuery,
  useReadBusinessByDescriptionQuery,
  useReadBusinessByIdQuery,
  useReadBusinessByNameQuery,
  useReadBusinessBySizeQuery,
  useReadBusinessByStatusQuery,
  useReadBusinessByUpdatedAtQuery,
  useReadBusinessByWebsiteQuery,
  useUpdateBusinessMutation,
} = businessApi;
