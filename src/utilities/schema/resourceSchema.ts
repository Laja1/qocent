import {  object } from 'yup';
import { defaultValidation,  } from '.';

export const deployModalSchema = object().shape({
    resourceType: defaultValidation('Resource type is required'),
    resourceSiteCode: defaultValidation('Resource side code is required'),
});
