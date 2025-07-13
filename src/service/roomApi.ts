/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithResponseCodeHandling } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
// import type { GetHouseListResponse } from "@/models/response/houseResponse"; // ✅ Ensure correct response
import { ApiEnums } from "@/utilities/enums";
import type { createHouseRequest } from "@/models/request/houseRequest";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: baseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.House],
  endpoints: (build) => ({
    createServerHouse: build.mutation<genericResponse, createHouseRequest>({
      query: (body) => ({
        url: "/house/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.House, id: "LIST" }],
    }),

    // getHousesByProvider: build.query<void, { provider: string | null }>({
    //   query: ({ provider }) => `/house/read-by-provider-id/${provider}`, 
    //   providesTags: (result) =>
    //     result?.data
    //       ? [
    //           { type: ApiEnums.House, id: "LIST" },
    //           ...result.data.map((house:any) => ({
    //             type: ApiEnums.House,
    //             id: house.houseId,
    //           })),
    //         ]
    //       : [{ type: ApiEnums.House, id: "LIST" }],
    // }),
  }),
});

export const {
  useCreateServerHouseMutation,
//   useGetHousesByProviderQuery,
} = roomApi;
