import { string } from "yup";


export const defaultValidation = (name: string) =>
  string().required(`${name} is required`);

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
