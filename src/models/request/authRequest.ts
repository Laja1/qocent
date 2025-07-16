export type signupRequest = {
  userAWSId?: string;
  userEmail: string;
  userFirstName: string;
  userHuaweiId?: string;
  userLastName: string;
  userPassword: string;
};

export const signUpInit:signupRequest = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
}

export type signInRequest = {
  userEmail: string;
  userPassword: string;
};

export const signInInit:signInRequest = {
  userEmail: "toni@yopmail.com",
  userPassword: "Ifeoluwa01.$",
}

export const forgotPasswordInit = {
    userEmail: "",
}


  

export type completeEnrollmentRequest = {
    otp: string,
   userEmail: string
 }
 
 export const completeEnrollmentInit:completeEnrollmentRequest = {
    otp: "",
   userEmail: ""
 }
 
 export type resendOtpRequest = {
 userEmail: string
}

export type forgotPasswordpRequest = {
  userEmail: string
 }

 export type completePasswordResetRequest = {
  otp: string,
 userEmail?: string,
 newPassword: string,
}






export const completePasswordResetInit:completePasswordResetRequest = {
  otp: "",
 userEmail: "",
 newPassword: "",
}