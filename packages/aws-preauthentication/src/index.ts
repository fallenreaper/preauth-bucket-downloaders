import { S3 } from "aws-sdk";

// If i need to pull from a different package, i can

// const s3 = new S3({
// 	accessKeyId: "YOUR_ACCESS_KEY_ID",
// 	secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
// 	region: "YOUR_AWS_REGION", // e.g., 'us-east-1'
// });

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
