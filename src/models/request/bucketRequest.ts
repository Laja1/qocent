export type downloadBucketContentRequest = {
    category: "storage";
    resource: "s3";
    action: "download_bucket_content";
    body: {
      name: string; // bucket name
      key: string;  // specific file key inside the bucket
    };
    xKey?:string
  };


  export type getSignedBucketUrlRequest = {
    category: string;
    resource: string;
    action: string;
    xKey?:string
    body: {
      name: string;     
      key: string;       
      file: string;    
      folder: string;   
      expiresIn: number;
    };
  };
  