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
