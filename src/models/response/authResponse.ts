 export interface signInResponse {
    accessToken: string;
    privileges: string[];
    responseCode: string;
    responseMessage: string;
    userEmail: string;
    userFirstName: string;
    userId: number;
    userLastName: string;
    userRoleId: number;
  }
  

  export type AccountMember = {
    memberUserCode: string;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    memberStatus: "ACTIVE" | "INACTIVE"; // assuming possible statuses
    memberCreatedAt: string | null;
  };
  
  export type AccountResponse = {
    accountId: number;
    accountCode: string;
    accountName: string;
    accountType: "INDIVIDUAL" | "BUSINESS"; // extend if there are other types
    accountStatus: "ACTIVE" | "INACTIVE";   // extend as needed
    members: AccountMember[];
    responseCode: string;
    responseMessage: string;
  };
  