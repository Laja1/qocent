import moment from 'moment';

export const cidrBlockRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/;
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





export const siteCodeRegex = /^[A-Z0-9]{3,10}$/; // Alphanumeric, 3-10 characters
export const houseCodeRegex = /^[A-Z0-9]{2,20}$/; // Alphanumeric, 2-20 characters
export const houseNameRegex = /^[a-zA-Z0-9\s\-_]{2,50}$/; // Alphanumeric with spaces, hyphens, underscores