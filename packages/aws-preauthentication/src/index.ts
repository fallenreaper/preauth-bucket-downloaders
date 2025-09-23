import { S3 } from "aws-sdk";

// If i need to pull from a different package, i can

export type S3_ENV_OPTIONAL = {
  S3_ACCESS_KEY_ID: string | undefined;
  S3_SECRET_ACCESS_KEY: string | undefined;
  S3_BUCKET: string | undefined;
  S3_REGION: string | undefined;
};
export type S3_ENV = {
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  S3_BUCKET: string;
  S3_REGION: string;
};

export const loginToAws = (data: S3.ClientConfiguration) => new S3(data);

export const generatePreSignedDownloadUrl = async (
  s3: S3,
  bucketName: string,
  objectKey: string,
  expiresInSeconds: number = 3600, // Default to 1 hour
): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Expires: expiresInSeconds,
  };

  try {
    const url = await s3.getSignedUrlPromise("getObject", params);
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
};
