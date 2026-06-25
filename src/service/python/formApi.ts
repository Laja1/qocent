/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { fileResponse } from "@/models/response/bucketResponse";
import { ApiEnums } from "@/utilities/enums";

export const formApi = createApi({
    baseQuery: baseQueryWithAuthGuard,
    reducerPath: 'formApi',
    tagTypes:[ApiEnums.Bucket],
    endpoints: (build) => ({
      getApiOptions: build.mutation<
        { label: string; value: string }[],
        { category: string; resource: string; action: string; body: Record<string, any> | string; xKey?: string }
      >({
        query: ({ category, resource, action, body, xKey }) => ({
          url: "/info",
          method: "POST",
          body: { category, resource, action, body },
          headers: {
            "Content-Type": "application/json",
            ...(xKey ? { "X-Key": xKey } : {}),
          },
        }),
        transformResponse: (response: unknown): { label: string; value: string }[] => {
          if (Array.isArray(response)) {
            return response as { label: string; value: string }[];
          }
          return [];
        },
        transformErrorResponse: (response: unknown): unknown => {
          return response;
        },
      }),

      getS3ListContent: build.mutation<
        fileResponse,
        { category: string; resource: string; action: string; body: Record<string, any>; xKey?: string }
      >({
        query: ({ category, resource, action, body, xKey }) => ({
          url: "/info",
          method: "POST",
          body: { category, resource, action, body },
          headers: xKey ? { "X-Key": xKey } : {},
        }),
      }),
    }),
  });

export const { useGetApiOptionsMutation, useGetS3ListContentMutation } = formApi;
