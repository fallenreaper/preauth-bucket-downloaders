import {
  generateR2PreSignedDownloadUrl,
  loginToR2Bucket,
  type R2_ENV,
  type R2_ENV_OPTIONAL,
} from ".";

const environmentInfo: R2_ENV_OPTIONAL = {
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_BUCKET: process.env.R2_BUCKET,
  R2_REGION: process.env.R2_REGION,
};
if (Object.values(environmentInfo).indexOf(undefined) < 0) {
  throw new Error(
    `Required Variables are missing. ${JSON.stringify(environmentInfo)}`,
  );
}

const parsedEnv = environmentInfo as R2_ENV;

const r2 = loginToR2Bucket({
  region: parsedEnv.R2_REGION || "auto",
  endpoint: `https://${parsedEnv.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: parsedEnv.R2_ACCESS_KEY_ID,
    secretAccessKey: parsedEnv.R2_SECRET_ACCESS_KEY,
  },
});

generateR2PreSignedDownloadUrl(
  r2,
  parsedEnv.R2_BUCKET,
  parsedEnv.R2_ACCESS_KEY_ID,
  3600,
);
