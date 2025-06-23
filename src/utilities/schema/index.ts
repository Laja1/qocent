import { string } from "yup";
import {
  containsAtleastOneLowerCase,
  containsAtleastOneNumber,
  containsAtLeastOneSpecialChar,
  containsAtleastOneUpperCase,
} from "../helper";

const urlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const defaultValidation = (name: string) =>
  string().required(`${name} is required`);

export const phoneValidation = (phoneNumber: string) =>
  string()
    .matches(/^(\+?234)?(\d{3})\s?\d{3}\s?\d{4}$/, "Enter valid phone number")
    .required(`${phoneNumber} is required`);

export const optionValidation = (msg?: string) =>
  string().required(msg || "Select an option");

export const urlValidation = (path: string, required = true) =>
  required
    ? string()
        .matches(urlRegex, "Enter valid url!")
        .required(`${path} is required`)
    : string().test({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        test: function (value: any) {
          if (!value) return true;
          return !urlRegex?.test(value)
            ? this.createError({
                message: "Invalid Url",
                path,
              })
            : true;
        },
      });

export const emailValidation = () =>
  string().email("Invalid email address").required("Email address is required");

export const passwordValidation = (label = "Password") =>
  string()
    .required(`${label} is required`)
    .min(8, `${label} must be at least 8 characters`)
    .test(
      "uppercase",
      `${label} must contain an uppercase letter`,
      containsAtleastOneUpperCase
    )
    .test(
      "special",
      `${label} must contain a special character`,
      containsAtLeastOneSpecialChar
    )
    .test(
      "lowercase",
      `${label} must contain a lowercase character`,
      containsAtleastOneLowerCase
    )
    .test(
      "number",
      `${label} must contain atleast one number`,
      containsAtleastOneNumber
    );
