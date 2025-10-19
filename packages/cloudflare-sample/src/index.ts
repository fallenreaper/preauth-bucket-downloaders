import {
  generateR2PreSignedDownloadUrl,
  generateR2PreSignedUploadUrl,
  loginToR2,
  type R2_ENV,
  type R2_ENV_OPTIONAL,
} from "cloudflare-preauthentication";
import fs from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";

const environmentInfo: R2_ENV_OPTIONAL = {
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_BUCKET: process.env.R2_BUCKET,
  R2_REGION: process.env.R2_REGION,
};
console.log("Env Information: ", environmentInfo);
if (Object.values(environmentInfo).indexOf(undefined) >= 0) {
  throw new Error(
    `Required Variables are missing. ${JSON.stringify(environmentInfo)}`,
  );
}

const uploadSample = async () => {
  const parsedEnv = environmentInfo as R2_ENV;
  const R2 = loginToR2(parsedEnv);
  const filePath = "samples/samplefile.txt";
  const fileContent = fs.readFileSync(`./${filePath}`);
  // const formData = new FormData();
  // formData.append("file", file);

  const objectKeyLocation = `uploads/${filePath}`;
  const url = await generateR2PreSignedUploadUrl(
    R2,
    parsedEnv.R2_BUCKET,
    objectKeyLocation,
    "text/plain",
  );
  console.log(`URL Obtained: ${url}`);

  // console.log(`Generated Form Data: ${formData}`)
  const response = await fetch(url, {
    method: "PUT",
    body: fileContent,
    headers: {
      "Content-Type": "text/plain",
    },
  });
  console.log(`Response Info: `, response);
  if (!response.ok) {
    const text = await response.text();
    console.log(`Error! ${response.status}: ${text}`);
  }
  return objectKeyLocation;
};

const downloadSample = async (objectKey: string) => {
  const parsedEnv = environmentInfo as R2_ENV;
  const R2 = loginToR2(parsedEnv);

  const url = await generateR2PreSignedDownloadUrl(
    R2,
    parsedEnv.R2_BUCKET,
    objectKey,
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });

  console.log("Fetch finished");
  if (!response.ok) {
    const text = await response.text();
    console.log(`Error! ${response.status}: ${text}`);
  }
  console.log("Response Information:", response);

  const { body } = response;
  if (!body) {
    return;
  }

  const writeStream = fs.createWriteStream("./FOO.txt");
  await finished(Readable.fromWeb(body as any).pipe(writeStream));
};

// The Main Function to execute for this file.
const main = async () => {
  console.log("Loading a Sample File");
  const objectKeyToDownload = await uploadSample();

  console.log("Downloading a Sample file");
  await downloadSample(objectKeyToDownload);

  console.log("Finished!");
};

main();
