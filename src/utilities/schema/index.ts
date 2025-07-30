import { string } from "yup";
import CIDR from 'ip-cidr';
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




        export const libraryCidrValidation = (fieldName: string, options?: {
          requirePrivate?: boolean;
          allowLoopback?: boolean;
        }) => {
          const { requirePrivate = true, allowLoopback = false } = options || {};
        
          return string()
            .required(`${fieldName} is required`)
            .trim()
            .test('valid-cidr', `${fieldName} must be a valid CIDR block`, (value) => {
              if (!value) return false;
              
              try {
                // The constructor will throw if invalid, so if we get here it's valid
                // const cidr = new CIDR(value);
                return true;
              } catch {
                return false;
              }
            })
            .test('ip-range-validation', 
              requirePrivate 
                ? `${fieldName} must use private IP ranges` 
                : `${fieldName} contains invalid IP range`, 
              (value) => {
                if (!value) return false;
                
                try {
                  const cidr = new CIDR(value);
                  const startIP = cidr.addressStart.address;
                  
                  // Parse IP parts
                  const ipParts = startIP.split('.').map(Number);
                  const [first, second] = ipParts;
                  
                  // Check for loopback
                  if (first === 127) {
                    return allowLoopback;
                  }
                  
                  if (requirePrivate) {
                    // Check private ranges
                    const isPrivate = 
                      first === 10 ||
                      (first === 172 && second >= 16 && second <= 31) ||
                      (first === 192 && second === 168);
                    
                    return isPrivate;
                  }
                  
                  // Basic validation for non-private requirement
                  return first > 0 && first < 224;
                } catch {
                  return false;
                }
              }
            );
        };


        // Helper function to check if IP is a valid network address
        const isValidNetworkAddress = (ip: string, prefix: number): boolean => {
          const ipParts = ip.split('.').map(Number);
          const ipNum = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
          
          const hostBits = 32 - prefix;
          const networkMask = (0xFFFFFFFF << hostBits) >>> 0;
          const networkAddress = (ipNum & networkMask) >>> 0;
          
          return ipNum === networkAddress;
        };
        
        export const improvedCidrValidation = (fieldName: string, options?: {
          requirePrivate?: boolean;
          allowLoopback?: boolean;
          minPrefix?: number;
          maxPrefix?: number;
        }) => {
          const {
            requirePrivate = true,
            allowLoopback = false,
            minPrefix = 1,
            maxPrefix = 32
          } = options || {};
        
          return string()
            .required(`${fieldName} is required`)
            .trim()
            .matches(cidrBlockRegex, {
              message: `${fieldName} must be a valid CIDR block (e.g., 192.168.1.0/24)`,
            })
            .test('valid-ip-parts', `${fieldName} must have valid IP address`, (value) => {
              if (!value) return false;
              
              const [ip] = value.split('/');
              const ipParts = ip.split('.').map(Number);
              
              return ipParts.length === 4 && 
                     ipParts.every(part => part >= 0 && part <= 255 && !isNaN(part));
            })
            .test('valid-prefix-range', `${fieldName} prefix must be between ${minPrefix} and ${maxPrefix}`, (value) => {
              if (!value) return false;
              
              const [, prefix] = value.split('/');
              const prefixNum = parseInt(prefix, 10);
              
              return prefixNum >= minPrefix && prefixNum <= maxPrefix;
            })
            .test('valid-network-address', `${fieldName} must be a valid network address`, (value) => {
              if (!value) return false;
              
              const [ip, prefix] = value.split('/');
              const prefixNum = parseInt(prefix, 10);
              
              return isValidNetworkAddress(ip, prefixNum);
            })
            .test('ip-range-validation', 
              requirePrivate 
                ? `${fieldName} must use private IP ranges` 
                : `${fieldName} contains invalid IP range`, 
              (value) => {
                if (!value) return false;
                
                const [ip] = value.split('/');
                const ipParts = ip.split('.').map(Number);
                const [first, second] = ipParts;
                
                // Check for loopback (127.x.x.x)
                if (first === 127) {
                  return allowLoopback;
                }
                
                // Check for private IP ranges if required
                if (requirePrivate) {
                  // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
                  const isPrivate = 
                    first === 10 ||
                    (first === 172 && second >= 16 && second <= 31) ||
                    (first === 192 && second === 168);
                  
                  return isPrivate;
                }
                
                // If not requiring private, just check it's not reserved
                // Exclude: 0.x.x.x, 224-255.x.x.x (multicast/reserved)
                return first > 0 && first < 224;
              }
            );
        };
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
        