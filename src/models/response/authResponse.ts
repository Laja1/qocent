export type resendOtpResponse = {
    responseCode: number,
    responseMessage: string
  }



  export type forgotPasswordResponse = {
    success: boolean;
    message: string;
    error: string;
    data: string
  }
  
  
  export type signUpResponse = {
    success: boolean;
    message: string;
    data: {
      userId: number;
      userEmail: string;
      message: string;
    };
  };
  

  export type completeEnrollmentResponse = {
    success: boolean;
    message: string;
    error: string;
    data: {
      accessToken: string;
      refreshToken: string;
      user: {
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        userId: number;
      };
    };
  
  }

  export type completePasswordResetResponse = {
    success: boolean;
    message: string;
    error: string;
    data: string
  }

  
  export interface signInResponse {
    success: boolean;
    message: string;
    error: string;
    data: {
      accessToken: string;
      refreshToken: string;
      user: {
        userFirstName: string;
        userLastName: string;
        userEmail: string;
        userId: number;
      }}
  }
  