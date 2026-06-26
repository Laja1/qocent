import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiEnums } from "@/utilities/enums";
import type { getDailyBillingResponse } from "@/models/response/costResponse";

export const costApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:'https://gtxwrtoahncf4nk24ze363m4wm0hrnbv.lambda-url.eu-west-1.on.aws'}),
    reducerPath: 'costApi',
    tagTypes:[ApiEnums.Bucket],
    endpoints: (build) => ({
        getQueryDailyBill: build.query<getDailyBillingResponse, {bill_cycle:string,service_type_code:string}>({
            query: ({bill_cycle,service_type_code}) => ({
                url:`/billing/query-daily-bills`,
                method:'GET',
                params:{bill_cycle,service_type_code}
            }),
          }),
    }),
  });

export const { useGetQueryDailyBillQuery } = costApi;
