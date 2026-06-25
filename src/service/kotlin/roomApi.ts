/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEnums } from "@/utilities/enums";
import { createResourceProviderTags, createRoomTags } from "@/utilities/tagHelpers";
import type { getAllRoomResponse } from "@/models/response/roomResponse";
import type { genericResponse } from "@/models/response";
import type { createResourceResponse } from "@/models/response/resourceResponse";
import type { createResourceRequest } from "@/models/request/resourceRequest";
import type { getResourcesResponse } from "@/models/response/siteResponse";
import { kotlinBaseApi } from "./baseApi";
import { KotlinResourceEndpoints, kotlinPath } from "./endpoints";

export const roomApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRoom: build.query<getAllRoomResponse,{ accountCode: string,provider:string, type: 'INTERNAL' | 'EXTERNAL' }>({
      query: ({accountCode,provider, type}) => ({
        url: kotlinPath(KotlinResourceEndpoints.readroombyaccountcode, { accountCode, provider }),
        params: { requestType: type },
      }),
      providesTags: (result) => createRoomTags(result,  "roomId"),
    }),
    createRoom: build.mutation<createResourceResponse, createResourceRequest>({
      query: (body) => ({
        url: KotlinResourceEndpoints.create,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
    getResourceInRoom: build.query<getResourcesResponse,{ roomCode: string }>({
      query: ({roomCode}) =>
        kotlinPath(KotlinResourceEndpoints.readresourcebyroomcode, { roomCode }), 
      providesTags: (result) => createResourceProviderTags(result,  "resourceId") as Array<{ type: ApiEnums.Resource; id: string | number | "LIST" }>,
  }),
    deleteRoom:build.mutation<genericResponse,{roomId:number}>({
      query:({roomId})=>({
        url: kotlinPath(KotlinResourceEndpoints.deleteroom, { roomId }),
        method: "POST",
       
      }),
      invalidatesTags: [{ type: ApiEnums.Room, id: "LIST" },{ type: ApiEnums.ActivityLog, id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllRoomQuery,
  useCreateRoomMutation,
  useGetResourceInRoomQuery,
  useDeleteRoomMutation,
} = roomApi;
