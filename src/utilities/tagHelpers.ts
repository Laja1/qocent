import { ApiEnums } from "./enums";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createProviderTags = <T extends { [key: string]: any }>(
    result: { data?: T[] } | undefined,
    apiEnum: string,
    idField: string
  ) => {
    return result?.data
      ? [
          { type: apiEnum, id: "LIST" },
          ...result.data.map((item: T) => ({
            type: apiEnum,
            id: item[idField],
          })),
        ]
      : [{ type: apiEnum, id: "LIST" }];
  };

 export const createResourceProviderTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Resource, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Resource,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Resource, id: "LIST" } as const];
  };
  