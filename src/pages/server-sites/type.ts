/* eslint-disable @typescript-eslint/no-explicit-any */


export interface summaryType {
  id:string
  resourceType: string
  count:number
}


export interface secutiyAnalysisType {
  id:string
  category: string
  type:string
  recommendation:string
  risk:'Low' | 'Medium' | 'High'
  description:string
}

export type level1CostTableType = {
  id: string;
  type: string;
  [key: string]: any; 
  costs: {
    [month: string]: number; 
  };
};


export interface level2CostTableType {
  type:string
  month:string[]
  
}