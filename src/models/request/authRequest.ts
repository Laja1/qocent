

export type signupRequest = {
  user_first_name:string,
  user_last_name:string,
  user_email:string,
  user_phone_number:string
  user_country:string
  user_password:string,
};
    
export const signUpInit = {
  user_first_name: "",
  user_last_name: "",
  user_email: "",
  user_phone_number:"",
  user_country:'',
  user_password: "",
};



export type signInRequest = {
  user_email?: string;
  user_password?: string;
};

export const signInInit = {
  user_email: "tomi@yopmail.com ",
  user_password: "Ifeoluwa01.$",
}

export const forgotPasswordInit = {
    email: "",
}


  

export type completeEnrollmentRequest = {
  code: string,
   email: string
 }
 
 export const completeEnrollmentInit = {
    otp: "",
   email: ""
 }
 
 export type resendOtpRequest = {
 email: string
}

export type forgotPasswordpRequest = {
  email: string
 }

 export type completePasswordResetRequest = {
  email:string
  new_password: string,
 confirm_password?: string,
 token: string,
}

export const completePasswordResetInit = {
  token: "",
  email:"",
 new_password: "",
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

export type updateProfessionalServiceRequest = {
  serviceBookingDate: string;
  serviceType: string;
}

export const updateProfessionalServiceInit:updateProfessionalServiceRequest = {
  serviceBookingDate: "",
  serviceType: "",
}