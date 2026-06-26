/* eslint-disable @typescript-eslint/no-explicit-any */
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { houseResponse } from "@/models/response/houseResponse";
import { createHouseProviderTags, createResourceProviderTags } from "@/utilities/tagHelpers";
import type { createResourceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { getResourcesResponse } from "@/models/response/siteResponse";
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinResourceEndpoints, kotlinPath } from "./endpoints";

export const kotlinHouseApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllHouse: build.query<houseResponse,{ accountCode: string,provider:string, type: 'INTERNAL' | 'EXTERNAL' }>({
      query: ({accountCode,provider, type}) => ({
        url: kotlinPath(KotlinResourceEndpoints.readHouseByAccountCode, { accountCode, provider }),
        params: { requestType: type },
      }),
      providesTags: (result) => createHouseProviderTags(result,  "houseId"),
    }),
    getResourceInHouse: build.query<getResourcesResponse,{ houseCode: string }>({
      query: ({houseCode}) =>
        kotlinPath(KotlinResourceEndpoints.readResourceByHouseCode, { houseCode }), 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
  }),
    deleteHouse:build.mutation<genericResponse,{houseId:number}>({
      query:({houseId})=>({
        url: kotlinPath(KotlinResourceEndpoints.deleteHouse, { houseId }),
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    createHouse: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: KotlinResourceEndpoints.create,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllHouseQuery,
  useDeleteHouseMutation,
  useCreateHouseMutation,
  useGetResourceInHouseQuery
} = kotlinHouseApi;
