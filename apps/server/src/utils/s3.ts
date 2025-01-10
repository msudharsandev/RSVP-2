import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
  region: process.env.AWS_REGION,
});

const generatePresignedUrl = async (fileName: string) => {
  const key = `${randomUUID()}-${fileName}`;
  const bucketParams: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
  };
  const command = new PutObjectCommand(bucketParams);

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });
  return { signedUrl, key };
};

export default generatePresignedUrl;
