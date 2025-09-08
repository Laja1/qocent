type file ={
    Key: string;
    Size: number;
    Url:string
  }

export type fileResponse = {
    responseCode: string;
    responseMessage: string;
    data: file[]
  };

  export type deleteBucketContentResponse = {
    responseCode: string;
    responseMessage: string;
    data: {
      Key: string;
    }[];
  };
  

  export type getSignedBucketUrlResponse = {
    responseCode: string;
    responseMessage: string;
    data: {
      uploadUrl: string;
    };
  };
  
  


  