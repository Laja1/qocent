/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import type { genericResponse } from "@/models/response";
// import type { GetHouseListResponse } from "@/models/response/houseResponse"; // ✅ Ensure correct response
import { ApiEnums } from "@/utilities/enums";
import type { getHouseResponse, houseResponse } from "@/models/response/houseResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import { createHouseProviderTags, createResourceProviderTags } from "@/utilities/tagHelpers";
import type { createResourceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { getResourcesResponse } from "@/models/response/siteResponse";

export const kotlinHouseApi = createApi({
  reducerPath: "kotlinHouseApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.House,ApiEnums.Resource,ApiEnums.ActivityLog],
  endpoints: (build) => ({
    createServerHouse: build.mutation<genericResponse, void>({
      query: (body) => ({
        url: "/house/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),

    getHousesByProvider: build.query<getHouseResponse, { provider: number | null }>({
      query: ({ provider }) => `/house/read-by-house-provider-id/${provider}`, 
      providesTags: (result) =>
        result?.data
          ? [
              { type: ApiEnums.House, id: "LIST" } as const,
              ...result.data.map((house:any) => ({
                type: ApiEnums.House as const,
                id: house.houseId,
              })),
            ]
          : [{ type: ApiEnums.House, id: "LIST" } as const],
    }),
    getAllHouse: build.query<houseResponse,{ accountCode: string,provider:string }>({
      query: ({accountCode,provider}) => `/resource/read-house-by-account-code/${accountCode}/${provider}`, 
      providesTags: (result) => createHouseProviderTags(result,  "houseId"),
    }),
    getResourceInHouse: build.query<getResourcesResponse,{ houseCode: string }>({
      query: ({houseCode}) => `/resource/read-resource-by-house-code/${houseCode}`, 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
  }),
    deleteHouse:build.mutation<genericResponse,{houseId:number}>({
      query:({houseId})=>({
        url: `/resource/delete-house/${houseId}`,
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    createHouse: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateServerHouseMutation,
  useGetHousesByProviderQuery,
  useGetAllHouseQuery,
  useDeleteHouseMutation,
  useCreateHouseMutation,
  useGetResourceInHouseQuery
} = kotlinHouseApi;
