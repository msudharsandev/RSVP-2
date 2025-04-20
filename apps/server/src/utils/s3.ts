import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import config from '@/config/config';

/**
 * Initializes an S3 client with the provided AWS credentials and region.
 */
const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY!,
    secretAccessKey: config.AWS_SECRET_KEY!,
  },
  region: config.AWS_REGION,
});

/**
 * Generates a presigned URL for uploading a file to an S3 bucket.
 * @param fileName - The name of the file to be uploaded.
 * @returns An object containing the presigned URL and the generated key for the file.
 *
 * - `signedUrl`: The presigned URL that allows the client to upload the file directly to S3.
 * - `key`: The unique key generated for the file in the S3 bucket.
 */
const generatePresignedUrl = async (fileName: string) => {
  const key = `${randomUUID()}-${fileName}`;
  const bucketParams: PutObjectCommandInput = {
    Bucket: config.AWS_BUCKET_NAME as string,
    Key: key,
  };
  const command = new PutObjectCommand(bucketParams);

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return { signedUrl, key };
};

export default generatePresignedUrl;
