/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type { getDailyBillingResponse, getQueryMonthlyBillResponse } from "@/models/response/costResponse";

export const costApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:'https://gtxwrtoahncf4nk24ze363m4wm0hrnbv.lambda-url.eu-west-1.on.aws'}),
    reducerPath: 'costApi',
    tagTypes:[ApiEnums.Bucket],
    endpoints: (build) => ({
     
        getQueryMonthlyBill: build.query<getQueryMonthlyBillResponse, {bill_cycle:string}>({
            query: ({bill_cycle}) =>( {
                url:`/billing/query-monthly-bills`,
                method:'GET',
                params:{bill_cycle}
            }),
            
            // providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
          }),
          getQueryDailyBill: build.query<getDailyBillingResponse, {bill_cycle:string,service_type_code:string}>({
            query: ({bill_cycle,service_type_code}) =>( {
                url:`/billing/query-daily-bills`,
                method:'GET',
                params:{bill_cycle,service_type_code}
            }),
            
            // providesTags: [{type:ApiEnums.Site,id:'LIST'},{type:ApiEnums.House,id:'LIST'},{type:ApiEnums.Resource,id:'LIST'}]
          }),
    
    
    }),
  });
  
export const {useGetQueryMonthlyBillQuery,useGetQueryDailyBillQuery,} = costApi