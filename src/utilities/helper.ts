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
      return "bg-yellow-50 text-yellow-800 border-yellow-500 text-[10px]";
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
      return "border-amber-200 bg-amber-50 text-amber-700";
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





export const replaceConfigPlaceholders = (
  obj: unknown,
  formikValues: { [x: string]: any }
): unknown => {
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceConfigPlaceholders(item, formikValues));
  } else if (obj !== null && typeof obj === "object") {
    const newObj: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(
      obj as Record<string, unknown>
    )) {
      newObj[key] = replaceConfigPlaceholders(value, formikValues);
    }
    return newObj;
  } else if (typeof obj === "string") {
    // Fixed: Handle different placeholder patterns
    if (obj === "@") {
      // For standalone @ placeholders, we need to determine the appropriate replacement
      // This is context-dependent, so we return a sensible default
      return "default";
    } else if (obj.startsWith("@") && obj.length > 1) {
      // Handle @fieldName patterns
      const fieldName = obj.substring(1);
      return formikValues[fieldName] || obj;
    }
    // Handle template strings with ${} patterns
    return obj.replace(/\$\{(\w+)\}/g, (match, fieldName) => {
      return formikValues[fieldName] || match;
    });
  }
  return obj;
};

export const siteCodeRegex = /^[A-Z0-9]{3,10}$/; // Alphanumeric, 3-10 characters
export const houseCodeRegex = /^[A-Z0-9]{2,20}$/; // Alphanumeric, 2-20 characters
export const houseNameRegex = /^[a-zA-Z0-9\s\-_]{2,50}$/; // Alphanumeric with spaces, hyphens, underscores