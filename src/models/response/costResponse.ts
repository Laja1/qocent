

  export type billProps = {
    service_type_name: string;
    count: number;
    official_amount: number;
    official_discount_amount: number;
    debt_amount: number;
  };
  
 export type getQueryMonthlyBillResponse = {
    responseCode: string;
    responseMessage: string;
    data: {
      bill_cycle: string;
      currency: string;
      total_official_amount: number;
      total_debt_amount: number;
      bills_returned: number;
      bills: billProps[];
    };
  };



export type Resource = {
  resource_id: string;
  resource_name: string | null;
  resource_type: string;
  amount: number;
};

export type Service = {
  service_name: string;
  total_amount: number;
  resource_count: number;
  resources: Resource[];
};

export type AggregatedDay = {
  date: string;
  total_amount: number;
  services: Service[];
};

export type getDailyBillingResponse = {
  responseCode: string;
  responseMessage: string;
  data: {
    group_by: string;
    aggregated_data: AggregatedDay[];
  };
};
