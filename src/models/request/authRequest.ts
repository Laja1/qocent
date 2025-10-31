export type Business = {
  businessContactEmail?: string;
  businessContactName?: string;
  businessContactNumber?: string;
  businessContactRole?: string;
  businessDescription?: string;
  businessName: string;
  businessSize: string;
  businessWebsite?: string;
};


export type SignupRequestBase = {
  accountName: string;
  accountType: string;
  userCountry?: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  userRoleId: number;
};

export type signupRequest =
  | (SignupRequestBase & {
      accountType: "organization";
      business: Business;
    })
  | (SignupRequestBase & {
      accountType: "individual";
      business?: never;
    });

    
export const signUpInit: signupRequest = {
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  userPassword: "",
  accountType: "individual",
  accountName: "",
  userRoleId: 100
};



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
  siteCode: string;
  inviteeEmail: string;
  inviterUserCode: string;
  privileges: string[];
};

export type acceptInvitationRequest = {
  siteCode: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userRoleId: number;
}


export type updateMemberRequest = {
  privileges: string[];
  siteCode: string;
  userId: string;
}