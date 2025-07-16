/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./httpClient/baseQuery";
import type { genericResponse } from "@/models/response";
import { ApiEnums } from "@/utilities/enums";
import type { createRoomRequest } from "@/models/request/homeRequest";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: baseQuery,
  tagTypes: [ApiEnums.Room],
  endpoints: (build) => ({
    createServeRoom: build.mutation<genericResponse, createRoomRequest>({
      query: (body) => ({
        url: "/room/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Room, id: "LIST" }],
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
  useCreateServeRoomMutation,
//   useGetHousesByProviderQuery,
} = roomApi;
