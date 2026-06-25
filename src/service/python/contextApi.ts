import { ApiEnums } from "@/utilities/enums";
import type {
  ContextListResponse,
  SelectContextRequest,
  SelectContextResponse,
  ActiveContextResponse,
  ServiceRedirectResponse,
  ServiceListResponse,
} from "@/models/response/contextResponse";
import { pythonBaseApi } from "./baseApi";

export const contextApi = pythonBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getContexts: build.query<ContextListResponse, void>({
      query: () => ({
        url: "/me/contexts",
      }),
      providesTags: [{ type: ApiEnums.Context, id: "LIST" }],
    }),

    selectContext: build.mutation<SelectContextResponse, SelectContextRequest>({
      query: (body) => ({
        url: "/me/contexts/select",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Context, id: "LIST" }],
    }),

    getActiveContext: build.query<ActiveContextResponse, void>({
      query: () => ({
        url: "/me/contexts/active",
      }),
      providesTags: [{ type: ApiEnums.Context, id: "ACTIVE" }],
    }),

    getServiceAccess: build.mutation<
      ServiceRedirectResponse,
      { service_name: string }
    >({
      query: ({ service_name }) => ({
        url: `/services/${service_name}/access`,
        method: "POST",
      }),
    }),

    getServices: build.query<ServiceListResponse, void>({
      query: () => ({
        url: "/services",
      }),
      providesTags: [{ type: ApiEnums.Context, id: "LIST" }],
    }),
  }),
});

export const {
  useGetContextsQuery,
  useSelectContextMutation,
  useGetActiveContextQuery,
  useGetServiceAccessMutation,
  useGetServicesQuery,
} = contextApi;
