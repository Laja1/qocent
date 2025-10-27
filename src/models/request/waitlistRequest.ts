export type waitlistFormPayload = {
    waitlistCompanyEmail: string;
    waitlistCompanyName: string;
    waitlistCompanySize: string;
    waitlistBookingDate: string,
    waitlistBookingType: string,
    waitlistEmail: string;
    waitlistFullName: string;
    waitlistPhoneNumber: string;
    waitlistRole: string;
  };
  
export const  waitlistInit = {
  fullName: "",
  email: "",
  mobileNumber: "",
  companyName: "",
  waitlistBookingDate:new Date(),
  companyEmail: "",
  companySize: "",
  role: "",
  }