/**
 * Kotlin API endpoints extracted from QocentConsoleBackend Swagger (qocent.json).
 * Source: QocentConsoleBackend Documentation v1.0.0
 * Host: v2auxqjrv8.execute-api.us-east-1.amazonaws.com
 */

export const KotlinActivityLogEndpoints = {
  /** GET /activity-log/read — read */
  read: '/activity-log/read',
} as const;

export const KotlinConfigEndpoints = {
  /** GET /configs/read/{configProvider}/{configServiceCode} — getConfigByProviderAndServiceCode */
  getconfigbyproviderandservicecode: '/configs/read/{configProvider}/{configServiceCode}',
} as const;

export const KotlinDashboardEndpoints = {
  /** GET /dashboard/read-resource-type-count/{siteCode} — readResourceTypeCount */
  readresourcetypecount: '/dashboard/read-resource-type-count/{siteCode}',
  /** GET /dashboard/resource-list/{siteCode} — readResourceList */
  readresourcelist: '/dashboard/resource-list/{siteCode}',
  /** GET /dashboard/site-architecture/{siteCode} — getSiteArchitecture */
  getsitearchitecture: '/dashboard/site-architecture/{siteCode}',
  /** GET /dashboard/site-data/{siteCode} — readSiteData */
  readsitedata: '/dashboard/site-data/{siteCode}',
  /** GET /dashboard/sites — readAllSites */
  readallsites: '/dashboard/sites',
} as const;

export const KotlinLookupEndpoints = {
  /** POST /look-up/form-options — getFormOptions */
  getformoptions: '/look-up/form-options',
} as const;

export const KotlinResourceEndpoints = {
  /** GET /resource/console-summary — getConsoleSummary */
  getconsolesummary: '/resource/console-summary',
  /** POST /resource/create-resource — create */
  create: '/resource/create-resource',
  /** POST /resource/create-starter-pack — createStarterPack */
  createstarterpack: '/resource/create-starter-pack',
  /** POST /resource/delete-house/{houseId} — deleteHouse */
  deletehouse: '/resource/delete-house/{houseId}',
  /** POST /resource/delete-resource-by-code/{resourceCode} — deleteResourceByResourceCode */
  deleteresourcebyresourcecode: '/resource/delete-resource-by-code/{resourceCode}',
  /** POST /resource/delete-resource/{resourceId} — deleteResource */
  deleteresource: '/resource/delete-resource/{resourceId}',
  /** POST /resource/delete-room/{roomId} — deleteRoom */
  deleteroom: '/resource/delete-room/{roomId}',
  /** POST /resource/deploy-resources/{siteCode} — deployResources */
  deployresources: '/resource/deploy-resources/{siteCode}',
  /** GET /resource/read-all-resources/{accountCode}/{provider} — readAllResources */
  readallresources: '/resource/read-all-resources/{accountCode}/{provider}',
  /** GET /resource/read-house-by-account-code/{accountCode}/{provider} — readHouseByAccountCode */
  readhousebyaccountcode: '/resource/read-house-by-account-code/{accountCode}/{provider}',
  /** GET /resource/read-resource-by-house-code/{houseCode} — readResourceByHouseCode */
  readresourcebyhousecode: '/resource/read-resource-by-house-code/{houseCode}',
  /** GET /resource/read-resource-by-room-code/{roomCode} — readResourceByRoomCode */
  readresourcebyroomcode: '/resource/read-resource-by-room-code/{roomCode}',
  /** GET /resource/read-room-by-account-code/{accountCode}/{provider} — readRoomByAccountCode */
  readroombyaccountcode: '/resource/read-room-by-account-code/{accountCode}/{provider}',
  /** GET /resource/template/{provider}/{parameterObject} — readResourceTemplate */
  readresourcetemplate: '/resource/template/{provider}/{parameterObject}',
} as const;

export const KotlinServiceEndpoints = {
  /** POST /service/create-service — createService */
  createservice: '/service/create-service',
  /** POST /service/delete/{serviceId} — deleteService */
  deleteservice: '/service/delete/{serviceId}',
  /** GET /service/{provider}/get-service-list — readServiceList */
  readservicelist: '/service/{provider}/get-service-list',
} as const;

export const KotlinSiteEndpoints = {
  /** POST /site/create-site — createSite */
  createsite: '/site/create-site',
  /** POST /site/delete/{siteId} — deleteSite */
  deletesite: '/site/delete/{siteId}',
  /** GET /site/read-architecture/{siteCode} — readArchitecture */
  readarchitecture: '/site/read-architecture/{siteCode}',
  /** GET /site/read-by-site-account-id/{siteAccountId}/{siteProvider} — readSiteBySiteCodeAndProvider */
  readsitebysitecodeandprovider: '/site/read-by-site-account-id/{siteAccountId}/{siteProvider}',
} as const;

export const KotlinWaitlistEndpoints = {
  /** POST /waitlist/add — addWaitlist */
  addwaitlist: '/waitlist/add',
} as const;

/** Replace `{param}` placeholders in swagger path templates. */
export function kotlinPath(
  template: string,
  params: Record<string, string | number> = {}
): string {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`{${key}}`, String(value)),
    template
  );
}
