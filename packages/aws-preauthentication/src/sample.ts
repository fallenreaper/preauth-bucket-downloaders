import {
  generatePreSignedDownloadUrl,
  loginToAws,
  type S3_ENV,
  type S3_ENV_OPTIONAL,
} from ".";

const environmentInfo: S3_ENV_OPTIONAL = {
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
};
if (Object.values(environmentInfo).indexOf(undefined) < 0) {
  throw new Error(
    `Required Variables are missing. ${JSON.stringify(environmentInfo)}`,
  );
}

const parsedEnv = environmentInfo as S3_ENV;

const S3 = loginToAws({
  region: parsedEnv.S3_REGION,
  credentials: {
    accessKeyId: parsedEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: parsedEnv.S3_SECRET_ACCESS_KEY,
  },
});

generatePreSignedDownloadUrl(
  S3,
  parsedEnv.S3_BUCKET,
  parsedEnv.S3_ACCESS_KEY_ID,
  3600,
);
