// import { S3 } from "aws-sdk";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const loginToAws = (data: S3_ENV) =>
  new S3Client({
    region: data.S3_REGION,
    credentials: {
      accessKeyId: data.S3_ACCESS_KEY_ID,
      secretAccessKey: data.S3_SECRET_ACCESS_KEY,
    },
  });

export const generatePreSignedDownloadUrl = async (
  s3: S3Client,
  bucketName: string,
  objectKey: string,
  expiresInSeconds: number = 3600, // Default to 1 hour
): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });
    const url = await getSignedUrl(s3, command, {
      expiresIn: expiresInSeconds,
    });
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
};

// passed in contentType needs to match file or object contentType.
// the resulting URL needs to be a http put request.
export const generatePreSignedUploadUrl = async (
  s3: S3Client,
  bucketName: string,
  objectKey: string,
  contentType: string,
  expiresInSeconds: number = 600, // Default to 10 min )
) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: expiresInSeconds,
  });
  return uploadUrl;
};
