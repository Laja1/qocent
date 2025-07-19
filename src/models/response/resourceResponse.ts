export type resourceType = {
  resourceId: number;
  resourceStatus: string;
  resourceCreatedAt: string;
  resourceUpdatedAt: string;
  resourceBill: number;
  resourceCode: string;
  resourceCreateChannel: string;
  resourceIP: string;
  resourceName: string;
  resourceProvider: string;
  resourceProviderId: string;
  resourceRoomCode: string;
  resourceSiteCode: string;
  resourceSubnetId: string;
  resourceType: string;
  resourceUserId: number;
  resourceVpcId: string;
};

export type resourceResponse = {
  success: boolean;
  message: string;
  data: resourceType[];
  error: string;
};

export type formResponse = {
  success: boolean;
  message: string;
  data: {
    label: string;
    value: string;
  }[];
  error: string;
};
