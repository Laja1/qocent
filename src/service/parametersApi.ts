/* eslint-disable @typescript-eslint/no-explicit-any */
import { kotlinBaseApi } from "./kotlinBaseApi";
import { KotlinParameterEndpoints, kotlinPath } from "./endpoints";
import type { genericResponse } from "@/models/response";

type AnyBody = Record<string, any>;

export const parametersApi = kotlinBaseApi.injectEndpoints({
  endpoints: (build) => ({
    bulkCreateParameters: build.mutation<genericResponse, AnyBody[]>({
      query: (body) => ({ url: KotlinParameterEndpoints.create, method: "POST", body }),
    }),
    deleteParameter: build.mutation<genericResponse, { parameterId: string | number }>({
      query: ({ parameterId }) => ({
        url: kotlinPath(KotlinParameterEndpoints.delete, { parameterId }),
        method: "POST",
      }),
    }),
    deleteParametersByProviderAndObject: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({
        url: KotlinParameterEndpoints.deleteByProviderAndObject,
        method: "POST",
        body,
      }),
    }),
    updateParameter: build.mutation<genericResponse, AnyBody>({
      query: (body) => ({ url: KotlinParameterEndpoints.update, method: "POST", body }),
    }),
  }),
});

export const {
  useBulkCreateParametersMutation,
  useDeleteParameterMutation,
  useDeleteParametersByProviderAndObjectMutation,
  useUpdateParameterMutation,
} = parametersApi;
