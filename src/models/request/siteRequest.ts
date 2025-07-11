export type createSiteRequest = {
  siteAccountId?: string;
  siteCode: string;
  siteCreatedAt?: string;
  siteCurrency?: string;
  siteDescription: string;
  siteEOLAction: string;
  siteExpiryDate: string;
  siteId?: number;
  siteName: string;
  sitePaymentType?: string;
  siteProvider: string;
  siteRegion: string;
  siteStatus?: string;
  siteUpdatedAt?: string;
  siteUserId?: number  | null; 
};
