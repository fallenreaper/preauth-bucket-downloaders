import {
  generatePreSignedDownloadUrl,
  generatePreSignedUploadUrl,
} from "aws-preauthentication";
import { S3Client } from "@aws-sdk/client-s3";

export type R2_ENV_OPTIONAL = {
  R2_ACCOUNT_ID: string | undefined;
  R2_ACCESS_KEY_ID: string | undefined;
  R2_SECRET_ACCESS_KEY: string | undefined;
  R2_BUCKET: string | undefined;
  R2_REGION: string | undefined;
};
export type R2_ENV = {
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET: string;
  R2_REGION: string;
};

export const loginToR2 = (data: R2_ENV) =>
  new S3Client({
    region: data.R2_REGION,
    endpoint: `https://${data.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: data.R2_ACCESS_KEY_ID,
      secretAccessKey: data.R2_SECRET_ACCESS_KEY,
    },
  });

export const generateR2PreSignedDownloadUrl = generatePreSignedDownloadUrl;

export const generateR2PreSignedUploadUrl = generatePreSignedUploadUrl;
