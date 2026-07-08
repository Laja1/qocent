import { ApiEnums } from "@/utilities/enums";
import type {
  ContextListResponse,
  SelectContextRequest,
  SelectContextResponse,
  ActiveContextResponse,
  ServiceRedirectResponse,
  ServiceListResponse,
} from "@/models/response/contextResponse";
import { pythonBaseApi } from "./pythonBaseApi";

const CONTEXT_PREFIX = "/context/me/contexts";

export const contextApi = pythonBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getContexts: build.query<ContextListResponse, void>({
      query: () => ({
        url: CONTEXT_PREFIX,
      }),
      providesTags: [{ type: ApiEnums.Context, id: "LIST" }],
    }),

    selectContext: build.mutation<SelectContextResponse, SelectContextRequest>({
      query: (body) => ({
        url: `${CONTEXT_PREFIX}/select`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: ApiEnums.Context, id: "LIST" }],
    }),

    getActiveContext: build.query<ActiveContextResponse, void>({
      query: () => ({
        url: `${CONTEXT_PREFIX}/active`,
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
