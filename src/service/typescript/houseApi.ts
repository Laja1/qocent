/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
// import type { GetHouseListResponse } from "@/models/response/houseResponse"; // ✅ Ensure correct response
import { ApiEnums } from "@/utilities/enums";
import type { getHouseResponse } from "@/models/response/homeResponse";

export const houseApi = createApi({
  reducerPath: "houseApi",
  baseQuery: baseQuery,
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
  }),
});

export const {
  useCreateServerHouseMutation,
  useGetHousesByProviderQuery,
} = houseApi;
