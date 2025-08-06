import { object } from "yup";
import { emailValidation } from ".";

export const InviteToWorkspaceSchema = object().shape({
   
    inviteeEmail: emailValidation(),
   
  });