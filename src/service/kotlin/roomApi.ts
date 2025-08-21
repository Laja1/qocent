/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import { kotlinBaseQueryWithResponseCodeHandling } from "../httpClient/baseQueryKotlin";
import { createResourceProviderTags, createRoomTags } from "@/utilities/tagHelpers";
import type { getAllRoomResponse } from "@/models/response/roomResponse";
import type { genericResponse } from "@/models/response";
import type { createResourceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { getResourcesResponse } from "@/models/response/siteResponse";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: kotlinBaseQueryWithResponseCodeHandling,
  tagTypes: [ApiEnums.House,ApiEnums.Room,ApiEnums.Resource],
  endpoints: (build) => ({
    getAllRoom: build.query<getAllRoomResponse,{ accountCode: string }>({
      query: ({accountCode}) => `/resource/read-room-by-account-code/${accountCode}`, 
      providesTags: (result) => createRoomTags(result,  "roomId"),
    }),
    createRoom: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: "/resource/create-resource",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Room, id: "LIST" }],
    }),
    getResourceInRoom: build.query<getResourcesResponse,{ roomCode: string }>({
      query: ({roomCode}) => `/resource/read-resource-by-room-code/${roomCode}`, 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
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
  useGetAllRoomQuery,
  useCreateRoomMutation,
  useGetResourceInRoomQuery,
  useDeleteRoomMutation,
} = roomApi;
