/**
 * Backend endpoint paths extracted from QocentConsoleBackend Swagger.
 * Source: QocentConsoleBackend Documentation v1.0.0
 * Host: v2auxqjrv8.execute-api.us-east-1.amazonaws.com
 * Paths exclude the leading `/api/{stage}` prefix (handled by VITE_KOTLIN_BASE_URL).
 */

export const KotlinAuthEndpoints = {
  acceptInvitation: '/authentication/accept-invitation',
  accountMembers: '/authentication/account-members/{accountCode}',
  activateAccount: '/authentication/activate-account/{accountCode}',
  availableModules: '/authentication/iam/available-modules',
  changePassword: '/authentication/change-password',
  completeEnrollment: '/authentication/complete-enrollment',
  completePasswordReset: '/authentication/complete-password-reset',
  createAccount: '/authentication/create-account',
  deactivateAccount: '/authentication/deactivate-account/{accountCode}',
  initiateEnrollment: '/authentication/initiate-enrollment',
  initiatePasswordReset: '/authentication/initiate-password-reset',
  inviteUser: '/authentication/invite-user',
  loadConfig: '/authentication/load-config',
  login: '/authentication/login',
  removeSiteMember: '/authentication/remove-site-member',
  resendOtp: '/authentication/resend-otp',
  siteMembers: '/authentication/site-members/{siteCode}',
  updateSiteMember: '/authentication/update-site-member',
  userDetails: '/authentication/user-details',
} as const;

export const KotlinBusinessEndpoints = {
  assignBusiness: '/business/assign-business',
  bulkCreate: '/business/bulk-create',
  create: '/business/create',
  delete: '/business/delete',
  getLeads: '/business/get-business-leads',
  getCustomerList: '/business/get-customer-list',
  read: '/business/read',
  readByContactEmail: '/business/read-by-business-contact-email/{businessContactEmail}',
  readByContactName: '/business/read-by-business-contact-name/{businessContactName}',
  readByContactNumber: '/business/read-by-business-contact-number/{businessContactNumber}',
  readByContactRole: '/business/read-by-business-contact-role/{businessContactRole}',
  readByCreatedAt: '/business/read-by-business-created-at/{businessCreatedAt}',
  readByDescription: '/business/read-by-business-description/{businessDescription}',
  readById: '/business/read-by-business-id/{businessId}',
  readByName: '/business/read-by-business-name/{businessName}',
  readBySize: '/business/read-by-business-size/{businessSize}',
  readByStatus: '/business/read-by-business-status/{businessStatus}',
  readByUpdatedAt: '/business/read-by-business-updated-at/{businessUpdatedAt}',
  readByWebsite: '/business/read-by-business-website/{businessWebsite}',
  update: '/business/update',
} as const;

export const KotlinConfigEndpoints = {
  create: '/configs/create',
  delete: '/configs/{configId}',
  readAll: '/configs/read-all',
  readByProviderAndService: '/configs/read/{configProvider}/{configServiceCode}',
  update: '/configs/update/{configId}',
} as const;

export const KotlinDashboardEndpoints = {
  readErrorLogs: '/dashboard/read-error-logs/{siteCode}',
  readResourceTypeCount: '/dashboard/read-resource-type-count/{siteCode}',
  readResourceList: '/dashboard/resource-list/{siteCode}',
  readServerParameters: '/dashboard/read-server-parameters/{siteCode}',
  siteArchitecture: '/dashboard/site-architecture/{siteCode}',
  siteArchitectureSummary: '/dashboard/site-architecture-summary/{siteCode}',
  siteDataFlow: '/dashboard/site-data-flow/{siteCode}',
  siteData: '/dashboard/site-data/{siteCode}',
  siteServerHouses: '/dashboard/site-server-houses/{siteCode}',
  siteServerRooms: '/dashboard/site-server-rooms/{siteCode}',
  sites: '/dashboard/sites',
} as const;

export const KotlinLookupEndpoints = {
  formOptions: '/look-up/form-options',
} as const;

export const KotlinParameterEndpoints = {
  create: '/parameters/create',
  delete: '/parameters/delete/{parameterId}',
  deleteByProviderAndObject: '/parameters/delete-by-provider-and-object',
  update: '/parameters/update',
} as const;

export const KotlinResourceEndpoints = {
  configByProvider: '/resource/config/{serviceCode}/{configProvider}',
  consoleSummary: '/resource/console-summary',
  consoleSummaryForSite: '/resource/console-summary/{siteCode}',
  create: '/resource/create-resource',
  createStarterPack: '/resource/create-starter-pack',
  deleteHouse: '/resource/delete-house/{houseId}',
  deleteResourceByCode: '/resource/delete-resource-by-code/{resourceCode}',
  deleteResource: '/resource/delete-resource/{resourceId}',
  deleteRoom: '/resource/delete-room/{roomId}',
  deployResources: '/resource/deploy-resources/{siteCode}',
  readAllResources: '/resource/read-all-resources/{accountCode}/{provider}',
  readHouseByAccountCode: '/resource/read-house-by-account-code/{accountCode}/{provider}',
  readResourceByHouseCode: '/resource/read-resource-by-house-code/{houseCode}',
  readResourceByRoomCode: '/resource/read-resource-by-room-code/{roomCode}',
  readRoomByAccountCode: '/resource/read-room-by-account-code/{accountCode}/{provider}',
  readResourceTemplate: '/resource/template/{provider}/{parameterObject}',
  terraformUpdateWebhook: '/resource/terraform/update-resource-webhook',
  viewPendingResources: '/resource/view-pending-resources/{siteCode}',
} as const;

export const KotlinServiceEndpoints = {
  createService: '/service/create-service',
  deleteService: '/service/delete/{serviceId}',
  readServiceList: '/service/{provider}/get-service-list',
} as const;

export const KotlinSiteEndpoints = {
  addKey: '/site/add-key',
  createHuaweiAccount: '/site/create-huawei-account',
  createHuaweiOtp: '/site/create-huawei-otp',
  createSite: '/site/create-site',
  deleteSite: '/site/delete/{siteId}',
  readArchitecture: '/site/read-architecture/{siteCode}',
  readSiteByAccountIdAndProvider: '/site/read-by-site-account-id/{siteAccountId}/{siteProvider}',
} as const;

export const KotlinActivityLogEndpoints = {
  read: '/activity-log/read',
} as const;

export const KotlinWaitlistEndpoints = {
  add: '/waitlist/add',
  assignLead: '/waitlist/assign-lead',
  delete: '/waitlist/delete',
  read: '/waitlist/read',
  readByEmail: '/waitlist/read-by-email/{waitlistEmail}',
  readById: '/waitlist/read-by-id/{waitlistId}',
  readByLeadId: '/waitlist/read-by-lead-id/{waitlistLeadId}',
  update: '/waitlist/update',
  updateStatus: '/waitlist/update-status/{waitlistId}/{status}',
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
