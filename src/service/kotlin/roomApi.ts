/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type { getHouseResponse } from "@/models/response/houseResponse";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import { createRoomTags } from "@/utilities/tagHelpers";
import type { getAllRoomResponse } from "@/models/response/roomResponse";
import type { genericResponse } from "@/models/response";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.House,ApiEnums.Room],
  endpoints: (build) => ({
   

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
    getAllRoom: build.query<getAllRoomResponse,{ accountCode: string }>({
      query: ({accountCode}) => `/resource/read-room-by-account-code/${accountCode}`, 
      providesTags: (result) => createRoomTags(result,  "roomId"),
    }),
    
    deleteRoom:build.mutation<genericResponse,{roomId:number}>({
      query:({roomId})=>({
        url: `/resource/delete-room/${roomId}`,
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Room, id: "LIST" }],
    }),
  }),
});

export const {
  useGetHousesByProviderQuery,
  useGetAllRoomQuery,
  useDeleteRoomMutation
} = roomApi;
