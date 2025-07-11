export type genericResponse = {
    responseCode: number,
    responseMessage: string
}
  
export type SiteData = {
  siteAccountId: string;
  siteCode: string;
  siteCreatedAt: string;
  siteCurrency: string | null;
  siteDescription: string;
  siteEOLAction: string;
  siteExpiryDate: string | null;
  siteId: number;
  siteName: string;
  sitePaymentType: string | null;
  siteProvider: string;
  siteRegion: string;
  siteStatus: string;
  siteUpdatedAt: string;
  siteUserId: number;
};

export type GetSiteListResponse = {
  responseCode: string; // typically "00"
  responseMessage: string;
  data: SiteData[];
};
