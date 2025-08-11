/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import type { genericResponse } from "@/models/response";
// import type { GetHouseListResponse } from "@/models/response/houseResponse"; // ✅ Ensure correct response
import { ApiEnums } from "@/utilities/enums";
import type { getHouseResponse, houseResponse } from "@/models/response/houseResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import { createHouseProviderTags } from "@/utilities/tagHelpers";

export const kotlinHouseApi = createApi({
  reducerPath: "kotlinHouseApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.House],
  endpoints: (build) => ({
    createServerHouse: build.mutation<genericResponse, void>({
      query: (body) => ({
        url: "/house/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" }],
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
    getAllHouse: build.query<houseResponse,{ accountCode: string }>({
      query: ({accountCode}) => `/resource/read-house-by-account-code/${accountCode}`, 
      providesTags: (result) => createHouseProviderTags(result,  "houseId"),
    }),
  }),
});

export const {
  useCreateServerHouseMutation,
  useGetHousesByProviderQuery,
  useGetAllHouseQuery
} = kotlinHouseApi;
