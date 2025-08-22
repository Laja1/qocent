/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';

export const cidrBlockRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(?:[0-9]|[1-2][0-9]|3[0-2])$/;
export const containsAtleastOneUpperCase = (val: string) => /(?=.*?[A-Z])/.test(val);

export const containsAtleastOneLowerCase = (val: string) =>
  val ? /(?=.*?[a-z])/.test(val) : false;

export const containsAtleastOneNumber = (val: string) => /(?=.*[0-9])/.test(val);

export const containsAtLeastOneSpecialChar = (val: string) =>
  /(?=.*[$&+,:;=?@#|'<>.^*_()%!-])/.test(val);

export const isEven = (number: number) => (number ? number % 2 === 0 : false);

export const isOdd = (number: number) => number % 2 !== 0;



export const formatDate =(date:string)=>{
  return moment(date).format("LL");
}



export const logOut = () => {
  localStorage.removeItem('billa_user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  window.location.href = '/';
};

export const getStatusClassName = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "bg-green-50 text-green-800 border-green-500 text-[10px]";
    case "PENDING":
      return "bg-amber-50 text-amber-800 border-amber-500 text-[10px]";
    case "DEPLOYED":
      return "bg-purple-50 text-purple-800 border-purple-500 text-[10px]";
    case "SUSPENDED":
      return "bg-orange-50 text-orange-800 border-orange-500 text-[10px]";
    case "DELETED":
      return "bg-red-50 text-red-800 border-red-500 text-[10px]";
    default:
      return "bg-gray-50 text-gray-800 border-gray-300 text-[10px]";
  }
};

export const getResourceTypeClassName = (type: string) => {
  switch (type.toUpperCase()) {
    case "DATABASE":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "SERVER":
      return "border-red-200 bg-red-50 text-red-700";
    case "NETWORK":
      return "border-purple-200 bg-purple-50 text-purple-700";
    case "STORAGE":
      return "border-green-200 bg-green-50 text-green-700";
      case "FILESTORAGE":
        return "border-green-200 bg-green-50 text-green-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};


const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Replaces ALL occurrences of @<key> in a string, wherever they appear
 * (including inside ${...} paths or concatenated like @name_suffix).
 * Only replaces keys that exist in formikValues.
 */
const replaceInString = (text: string, formikValues: Record<string, any>) => {
  let out = text;
  const keys = Object.keys(formikValues).sort((a, b) => b.length - a.length); // longest first
  for (const k of keys) {
    const v = String(formikValues[k]);
    out = out.replace(new RegExp(escapeRegExp("@" + k), "g"), v);
  }
  return out;
};

export const replaceConfigPlaceholders = (
  obj: unknown,
  formikValues: Record<string, any>
): unknown => {
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceConfigPlaceholders(item, formikValues));
  }

  if (obj !== null && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [rawKey, rawVal] of Object.entries(obj as Record<string, unknown>)) {
      // Replace @placeholders anywhere in the key (not just prefix)
      const newKey =
        rawKey.includes("@") ? replaceInString(rawKey, formikValues) : rawKey;

      out[newKey] = replaceConfigPlaceholders(rawVal, formikValues);
    }
    return out;
  }

  if (typeof obj === "string") {
    // Replace @placeholders anywhere in the string value
    return replaceInString(obj, formikValues);
  }

  return obj; // numbers, booleans, null
};


// export const replaceConfigPlaceholders = (
//   obj: unknown,
//   formikValues: { [x: string]: any }
// ): unknown => {
//   if (Array.isArray(obj)) {
//     return obj.map((item) => replaceConfigPlaceholders(item, formikValues));
//   } else if (obj !== null && typeof obj === "object") {
//     const newObj: { [key: string]: unknown } = {};
    
//     for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
//       // Process the key for placeholders
//       let newKey = key;
//       if (key.startsWith("@") && key.length > 1) {
//         const fieldName = key.substring(1);
//         newKey = formikValues[fieldName] || key;
//       }
      
//       // Process the value recursively
//       newObj[newKey] = replaceConfigPlaceholders(value, formikValues);
//     }
//     return newObj;
//   } else if (typeof obj === "string") {
//     return processStringPlaceholders(obj, formikValues);
//   }
//   return obj;
// };

// const processStringPlaceholders = (
//   str: string, 
//   formikValues: { [x: string]: any }
// ): string => {
//   // Handle standalone @ placeholders
//   if (str === "@") {
//     return "default";
//   }
  
//   // Handle simple @fieldName patterns (not inside ${})
//   if (str.startsWith("@") && str.length > 1 && !str.includes("${")) {
//     const fieldName = str.substring(1);
//     return formikValues[fieldName] || str;
//   }
  
//   // Handle complex template strings with ${}
//   return str.replace(/\$\{([^}]+)\}/g, ( content) => {
//     // First, replace any @ placeholders within the ${} content
//     const processedContent = content.replace(/@(\w+)/g, (atMatch: string, fieldName: string) => {
//       return formikValues[fieldName] || atMatch;
//     });
    
//     // Return the processed content back in the ${} format
//     return `\${${processedContent}}`;
//   });
// };


export const siteCodeRegex = /^[A-Z0-9]{3,10}$/; // Alphanumeric, 3-10 characters
export const houseCodeRegex = /^[A-Z0-9]{2,20}$/; // Alphanumeric, 2-20 characters
export const houseNameRegex = /^[a-zA-Z0-9\s\-_]{2,50}$/; // Alphanumeric with spaces, hyphens, underscores