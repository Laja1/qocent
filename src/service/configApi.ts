/* eslint-disable @typescript-eslint/no-explicit-any */
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinConfigEndpoints, kotlinPath } from "./endpoints";
import { ApiEnums } from "@/utilities/enums";
import type { genericResponse } from "@/models/response";

type AnyBody = Record<string, any>;
type AnyResp = { responseCode: string; responseMessage: string; data?: any };

export const configApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createConfig: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinConfigEndpoints.create, method: "POST", body }),
      invalidatesTags: [{ type: ApiEnums.Config, id: "LIST" }],
    }),
    getAllConfigs: build.query<AnyResp, void>({
      query: () => KotlinConfigEndpoints.readAll,
      providesTags: [{ type: ApiEnums.Config, id: "LIST" }],
    }),
    updateConfig: build.mutation<genericResponse, { configId: string | number; body: AnyBody }>({
      query: ({ configId, body }) => ({
        url: kotlinPath(KotlinConfigEndpoints.update, { configId }),
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Config, id: "LIST" }],
    }),
    deleteConfig: build.mutation<genericResponse, { configId: string | number }>({
      query: ({ configId }) => ({
        url: kotlinPath(KotlinConfigEndpoints.delete, { configId }),
        method: "POST",
      }),
      invalidatesTags: [{ type: ApiEnums.Config, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateConfigMutation,
  useGetAllConfigsQuery,
  useUpdateConfigMutation,
  useDeleteConfigMutation,
} = configApi;
