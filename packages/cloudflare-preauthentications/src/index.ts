import { generatePreSignedDownloadUrl } from "aws-preauthentication/src";
import "aws-sdk";
import { S3 } from "aws-sdk";

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

export const loginToR2Bucket = (data: S3.ClientConfiguration) => new S3(data);

export const generateR2PreSignedDownloadUrl = generatePreSignedDownloadUrl;
