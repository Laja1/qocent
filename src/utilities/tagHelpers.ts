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

  export const createServiceProviderTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Service, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Service,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Service, id: "LIST" } as const];
  };

  export const createHouseProviderTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.House, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.House,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.House, id: "LIST" } as const];
  };
  export const createRoomTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Room, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Room,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Room, id: "LIST" } as const];
  };
  export const createMemberProviderTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Member, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Member,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Member, id: "LIST" } as const];
  };


  export const createSiteProviderTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Site, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Site,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Site, id: "LIST" } as const];
  };
  

  export const createConfigTags = <T extends Record<string, any>>(
    result: { data?: T[] } | undefined,
    idField: keyof T
  ) => {
    return result?.data
      ? [
          { type: ApiEnums.Config, id: "LIST" } as const,
          ...result.data.map((item: T) => ({
            type: ApiEnums.Config,
            id: item[idField],
          } as const)),
        ]
      : [{ type: ApiEnums.Config, id: "LIST" } as const];
  }
  