/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";
import type { deleteBucketContentResponse, fileResponse, getSignedBucketUrlResponse } from "@/models/response/bucketResponse";
import type { downloadBucketContentRequest, getSignedBucketUrlRequest } from "@/models/request/bucketRequest";
import { ApiEnums } from "@/utilities/enums";

export const formApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'formApi',
    tagTypes:[ApiEnums.Bucket],
    endpoints: (build) => ({
      getApiOptions: build.mutation<
      { label: string; value: string }[],
      { category: string; resource: string; action: string; body: string; xKey?: string }
    >({
      query: ({ category, resource, action, body, xKey }) => ({
        url: "/info",
        method: "POST",
        body: { category, resource, action, body },

       headers: {
      "Content-Type": "application/json", // safe to include
      ...(xKey ? { "X-Key": xKey } : {}),
    },
      }),
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
          // Remove providesTags to fix the type error
        }),
        deleteS3File: build.mutation<deleteBucketContentResponse, {
          category: "storage",
          resource: "s3",
          action: "delete_bucket_content",
          body: {
            name: string;
            keys: { Key: string }[]
          },
          xKey?: string
        }>({
          query: ({ category, resource, action, body, xKey }) => ({
            url: "/info",
            method: "POST",
            body: { category, resource, action, body },
            headers: xKey ? { "X-Key": xKey } : {}, 
          }),
          invalidatesTags: [ApiEnums.Bucket]
        }),         
          downloadFile: build.mutation<Blob, downloadBucketContentRequest>({
            query: ({ category, resource, action, body, xKey }) => ({
              url: "/info",
              method: "POST",
              body: { category, resource, action, body },
              headers: xKey ? { "X-Key": xKey } : {}, 
              responseHandler: (response) => response.blob(), 
          }), }),
          generateUploadUrl: build.mutation<getSignedBucketUrlResponse, getSignedBucketUrlRequest>({
            query: ({ category, resource, action, body, xKey }) => ({
              url: "/info",
              method: "POST",
              body: { category, resource, action, body },
              headers: xKey ? { "X-Key": xKey } : {}, 
          }), }),
    }),
  });
  
export const {useGetApiOptionsMutation,useGetS3ListContentMutation,useDeleteS3FileMutation,useDownloadFileMutation,useGenerateUploadUrlMutation} = formApi