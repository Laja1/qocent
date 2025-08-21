export type signupRequest = {
  accountName?: string;
  accountType: string;
  userCountry?: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  userRoleId?: number;
};


export const signUpInit:signupRequest = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    accountType:"",
    accountName:"",
    userRoleId:100
}

export type signInRequest = {
  userEmail?: string;
  userPassword?: string;
  idToken:string
};

export const signInInit = {
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
 userPassword: string,
}

export const completePasswordResetInit:completePasswordResetRequest = {
  otp: "",
 userEmail: "",
 userPassword: "",
}



export type invitationRequest = {
  accountCode: string;
  inviteeEmail: string;
  inviterUserCode: string;
};
