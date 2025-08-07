import { object } from "yup";
import { defaultValidation, emailValidation } from ".";

export const waitlistSchema = object().shape({
  fullName: defaultValidation("Full Name"),
  mobileNumber: defaultValidation("Phone number"),
  companyName: defaultValidation("Company Name"),
  email: emailValidation(),
  companyEmail: emailValidation(),
  companySize: defaultValidation("Company Size"),
  role: defaultValidation("Role"),
});
