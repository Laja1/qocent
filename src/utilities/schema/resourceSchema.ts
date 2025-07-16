import {  object } from 'yup';
import { cidrValidation, defaultValidation,  } from '.';

export const deployModalSchema = object().shape({
    resourceType: defaultValidation('Resource type is required'),
    // resourceSiteCode: defaultValidation('Resource side code is required'),
});

export const createSiteSchema = object().shape({
  siteCode: defaultValidation("Site code"),
  siteDescription: defaultValidation("Site description"),
  siteEOLAction: defaultValidation("Site end of life action").oneOf(
    ["archive", "delete", "extend", "notify"],
    "Invalid action selected"
  ),
  siteExpiryDate: defaultValidation("Site expiry").test(
    "is-date",
    "Site expiry must be a valid date",
    (value) => !value || !isNaN(Date.parse(value))
  ),
  siteProvider: defaultValidation("Site provider").oneOf(
    ["aws", "huawei", "gcp", "azure"],
    "Invalid provider selected"
  ),
  siteRegion: defaultValidation("Site region"),
});


export const houseSchema = object().shape({
  houseSiteCode: defaultValidation("Site code"),
  houseCode: defaultValidation("House code"),
  houseName: defaultValidation("House name"),
 

  houseRegion: defaultValidation("House region"),
  houseCidr:cidrValidation('house cidr block')
});




  