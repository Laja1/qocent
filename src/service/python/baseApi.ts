import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthGuard } from "../httpClient/baseQuery";
import { ApiEnums } from "@/utilities/enums";

export const pythonBaseApi = createApi({
  reducerPath: "pythonBaseApi",
  baseQuery: baseQueryWithAuthGuard,
  tagTypes: [ApiEnums.Wallet, ApiEnums.BillingSpend],
  endpoints: () => ({}),
});
