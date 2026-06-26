/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEnums } from "@/utilities/enums";
import { createServiceProviderTags } from "@/utilities/tagHelpers";
import type { servicePayload, serviceResponse } from "@/models/response/serviceResponse";
import type { formResponse } from "@/models/response/resourceResponse";
import type { genericResponse } from "@/models/response";
import { kotlinBaseApi } from "./kotlinBaseApi";
import {
  KotlinLookupEndpoints,
  KotlinServiceEndpoints,
  kotlinPath,
} from "./endpoints";

export const serviceApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<serviceResponse, { provider: string }>({
      query: ({ provider }) =>
        kotlinPath(KotlinServiceEndpoints.readServiceList, { provider }),
      providesTags: (result) => createServiceProviderTags(result, "serviceId"),
    }),
    createService: build.mutation<genericResponse, servicePayload>({
      query: (body) => ({ url: KotlinServiceEndpoints.createService, method: "POST", body }),
      invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
    }),
    deleteService: build.mutation<genericResponse, { serviceId: number }>({
      query: ({ serviceId }) => ({
        url: kotlinPath(KotlinServiceEndpoints.deleteService, { serviceId }),
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
    }),
    getFormOptions: build.mutation<formResponse, { query: string }>({
      query: (body) => ({
        url: KotlinLookupEndpoints.formOptions,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetFormOptionsMutation,
} = serviceApi;
