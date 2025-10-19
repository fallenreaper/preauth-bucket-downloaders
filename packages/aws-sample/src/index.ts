import {
  generatePreSignedDownloadUrl,
  generatePreSignedUploadUrl,
  loginToAws,
  type S3_ENV,
  type S3_ENV_OPTIONAL,
} from "aws-preauthentication";
import fs from "fs";
import { Readable } from "stream";
import { finished } from "stream/promises";

const environmentInfo: S3_ENV_OPTIONAL = {
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
};
console.log("Env Information: ", environmentInfo);
if (Object.values(environmentInfo).indexOf(undefined) >= 0) {
  throw new Error(
    `Required Variables are missing. ${JSON.stringify(environmentInfo)}`,
  );
}

const uploadSample = async () => {
  const parsedEnv = environmentInfo as S3_ENV;
  const S3 = loginToAws(parsedEnv);
  const filePath = "samples/samplefile.txt";
  const fileContent = fs.readFileSync(`./${filePath}`);
  // const formData = new FormData();
  // formData.append("file", file);

  const objectKeyLocation = `uploads/${filePath}`;
  const url = await generatePreSignedUploadUrl(
    S3,
    parsedEnv.S3_BUCKET,
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
  const parsedEnv = environmentInfo as S3_ENV;
  const S3 = loginToAws(parsedEnv);

  const url = await generatePreSignedDownloadUrl(
    S3,
    parsedEnv.S3_BUCKET,
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
