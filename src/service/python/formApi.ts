import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../httpClient/baseQuery";

export const formApi = createApi({
    baseQuery: baseQuery,
    reducerPath: 'formApi',
    endpoints: (build) => ({
        getApiOptions: build.mutation<{label:string,value:string}[], {category: string,resource:string,action:string,body:string,xKey?: string}>({
            query: (body) => ({
              url: "/info",
              method: "POST",
              body,
          }), }),
    }),
  });
  
export const {useGetApiOptionsMutation} = formApi