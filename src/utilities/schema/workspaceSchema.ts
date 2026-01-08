import { object, string } from "yup";
import { emailValidation } from ".";

export const InviteToWorkspaceSchema = object().shape({
   
  recipient_identifier: emailValidation(),
  role: string().oneOf(['Member','Viewer'],'Please select a role').required('Role is required'),
})