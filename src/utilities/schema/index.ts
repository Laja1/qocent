import { string } from "yup";
import { cidrBlockRegex, houseCodeRegex, houseNameRegex, siteCodeRegex } from "../helper";


export const defaultValidation = (name: string) =>
  string().min(1,'cannot be empty').required(`${name} is required`);

export const phoneValidation = (phoneNumber: string) =>
  string()
    .matches(/^(\+?234)?(\d{3})\s?\d{3}\s?\d{4}$/, "Enter valid phone number")
    .required(`${phoneNumber} is required`);

export const optionValidation = (msg?: string) =>
  string().required(msg || "Select an option");

// export const urlValidation = (path: string, required = true) =>
//   required
//     ? string()
//         .matches(urlRegex, "Enter valid url!")
//         .required(`${path} is required`)
//     : string().test({
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         test: function (value: any) {
//           if (!value) return true;
//           return !urlRegex?.test(value)
//             ? this.createError({
//                 message: "Invalid Url",
//                 path,
//               })
//             : true;
//         },
//       });

export const emailValidation = () =>
  string().email("Invalid email address").required("Email address is required");


export const passwordValidation = (label = "Password") =>
  string()
    .required(`${label} is required`)
    .matches(/[A-Z]/, `${label} must contain at least one uppercase letter`)
    .matches(/[a-z]/, `${label} must contain at least one lowercase letter`)
    .matches(/\d/, `${label} must contain at least one number`)
    .matches(
      /[@$!%*?&#^()_\-+=]/,
      `${label} must contain at least one special character`
    )
    .min(8, `${label} must be at least 8 characters long`);

    export const codeValidatiion = (name: string) =>
      string()
        .required(`${name} is required`)
        .min(6, `Must be ${6} digits`)
        .max(6, `Must be ${6} digits`);




  // Enhanced CIDR validation
  export const  cidrValidation = (fieldName: string) =>
    string()
.required(`${fieldName} is required`)
.trim()
.matches(cidrBlockRegex, {
  message: `${fieldName} must be a valid CIDR block (e.g., 192.168.1.0/24)`,
})
.test('valid-cidr-range', `${fieldName} must have a valid network range`, (value) => {
  if (!value) return false;
  
  const [ip, prefix] = value.split('/');
  const prefixNum = parseInt(prefix, 10);
  
  // Check if prefix is reasonable (not too small for most use cases)
  if (prefixNum < 8 || prefixNum > 30) {
    return false;
  }
  
  // Validate IP address parts
  const ipParts = ip.split('.').map(Number);
  return ipParts.every(part => part >= 0 && part <= 255);
})
.test('private-ip-range', `${fieldName} should use private IP ranges`, (value) => {
  if (!value) return false;
  
  const [ip] = value.split('/');
  const ipParts = ip.split('.').map(Number);
  const [first, second] = ipParts;
  
  // Check for private IP ranges
  // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
  const isPrivate = 
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168);
  
  return isPrivate;
});
  
  // Site code validation
  export  const siteCodeValidation = (fieldName: string) =>
    string()
.required(`${fieldName} is required`)
.trim()
.matches(siteCodeRegex, {
  message: `${fieldName} must be 3-10 alphanumeric characters`,
})
.uppercase();
  
  // House code validation
export const houseCodeValidation = (fieldName: string) =>
    string()
.required(`${fieldName} is required`)
.trim()
.matches(houseCodeRegex, {
  message: `${fieldName} must be 2-20 alphanumeric characters`,
})
.uppercase();
  
  // House name validation
  export const houseNameValidation = (fieldName: string) =>
    string()
.required(`${fieldName} is required`)
.trim()
.min(2, `${fieldName} must be at least 2 characters`)
.max(50, `${fieldName} must not exceed 50 characters`)
.matches(houseNameRegex, {
  message: `${fieldName} can only contain letters, numbers, spaces, hyphens, and underscores`,
});
  
  // Region validation
  export  const regionValidation = (fieldName: string) =>
    string()
.required(`${fieldName} is required`)
.trim()
.min(2, `${fieldName} must be at least 2 characters`)
      .max(30, `${fieldName} must not exceed 30 characters`);
        