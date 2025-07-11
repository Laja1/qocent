export type resendOtpResponse = {
    responseCode: number,
    responseMessage: string
  }



  export type forgotPasswordResponse = {
    responseCode: number,
    responseMessage: string
  }
  
  export type signUpResponse = {
    responseCode: number,
    responseMessage: string
  }

  export type completeEnrollmentResponse = {
    responseCode: number,
    responseMessage: string
  }

  export type completePasswordResetResponse = {
    responseCode: number,
    responseMessage: string
  }

  export interface UserData {
    userAWSId: string | null;
    userEmail: string;
    userFirstName: string;
    userHuaweiId: string | null;
    userId: number;
    userLastLoginDate: string;
    userLastLoginIpAddress: string;
    userLastName: string;
    userLoginCount: number;
    userPassword: string;
    userRoleId: number;
    userStatus: "ACTIVE" | "INACTIVE" | string; // Expand if needed
  }
  
  export interface signInResponse {
    userEmail: string;
    privileges: string[];
    token: string;
    responseCode: string;
    responseMessage: string;
    data: UserData;
  }
  