/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import type { deleteBucketContentResponse, fileResponse, getSignedBucketUrlResponse } from "@/models/response/bucketResponse";
import type { downloadBucketContentRequest, getSignedBucketUrlRequest } from "@/models/request/bucketRequest";
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
      query: ({ category, resource, action, body, xKey }) => {
        
        const config = {
          url: "/info",
          method: "POST",
          body: { category, resource, action, body },
          headers: {
            "Content-Type": "application/json",
            ...(xKey ? { "X-Key": xKey } : {}),
          },
        };
        
        return config;
      },
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
              responseHandler: (response:any) => response.blob(), 
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