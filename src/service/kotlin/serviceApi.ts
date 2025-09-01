/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import {  createServiceProviderTags } from "@/utilities/tagHelpers";
import type { genericResponse } from "@/models/response";
import type { servicePayload,serviceResponse } from "@/models/response/serviceResponse";
import type { formResponse } from "@/models/response/resourceResponse";


export const  serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.Service],
  endpoints: (build) => ({


  
getServices:build.query<serviceResponse, {provider:string}>({
    query: ({provider}) => `/service/${provider}/get-service-list`,   
    providesTags: (result) => createServiceProviderTags(result,  "serviceId"),
  }),

  deleteService: build.mutation<genericResponse,{serviceId:number}>({
    query: ({serviceId}) => ({
      url: `/service/delete/${serviceId}`,
      method: "POST",
    }),
    invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
  }),

createService: build.mutation<genericResponse,servicePayload>({
      query: (body) => ({
        url: "/service/create-service",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Service, id: "LIST" }],
    }),
  getFormOptions: build.mutation<formResponse, {query: string}>({
      query: (body) => ({
        url: "/look-up/form-options",
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
