/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEnums } from "@/utilities/enums";
import {  createServiceProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";
import type { servicePayload,serviceResponse } from "@/models/response/serviceResponse";
import type { formResponse } from "@/models/response/resourceResponse";
import { kotlinBaseApi } from "./baseApi";
import {
  KotlinLookupEndpoints,
  KotlinServiceEndpoints,
  kotlinPath,
} from "./endpoints";

export const serviceApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
getServices:build.query<serviceResponse, {provider:string}>({
    query: ({provider}) =>
      kotlinPath(KotlinServiceEndpoints.readservicelist, { provider }),   
    providesTags: (result) => createServiceProviderTags(result,  "serviceId"),
  }),

  deleteService: build.mutation<genericResponse,{serviceId:number}>({
    query: ({serviceId}) => ({
      url: kotlinPath(KotlinServiceEndpoints.deleteservice, { serviceId }),
      method: "POST",
    }),
    invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
  }),

createService: build.mutation<genericResponse,servicePayload>({
      query: (body) => ({
        url: KotlinServiceEndpoints.createservice,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
    }),
  getFormOptions: build.mutation<formResponse, {query: string}>({
      query: (body) => ({
        url: KotlinLookupEndpoints.getformoptions,
        method: "POST",
        body,
    }), }),
 
  }),
});

export const {
useGetServicesQuery,
useCreateServiceMutation,
useDeleteServiceMutation,
useGetFormOptionsMutation

} = serviceApi;
