import {
  generatePreSignedDownloadUrl,
  generatePreSignedUploadUrl,
  loginToAws,
  type S3_ENV,
  type S3_ENV_OPTIONAL,
} from "aws-preauthentication";
import fs from "fs";

const environmentInfo: S3_ENV_OPTIONAL = {
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
};
console.log("Env Information: ", environmentInfo)
if (Object.values(environmentInfo).indexOf(undefined) >= 0) {
  throw new Error(
    `Required Variables are missing. ${JSON.stringify(environmentInfo)}`,
  );
}

const main = async () => {
  const parsedEnv = environmentInfo as S3_ENV;
  const S3 = loginToAws(parsedEnv);
  const filePath = "samples/samplefile.txt"
  const fileContent = fs.readFileSync(`./${filePath}`);
  // const formData = new FormData();
  // formData.append("file", file);

  const url = await generatePreSignedUploadUrl( S3, parsedEnv.S3_BUCKET, `uploads/${filePath}`, "text/plain");
  console.log(`URL Obtained: ${url}`)
  
  // console.log(`Generated Form Data: ${formData}`)
  const response = await fetch(url, {
    method: "PUT",
    body: fileContent,
    headers: {
      "Content-Type": "text/plain"
    }
  })
  console.log(`Response Info: `, response)
  if (!response.ok){
    const text = await response.text()
    console.log(`Error Status: ${response.status}`)
    console.log(`Error Text: ${text}`)
  }
}
main()