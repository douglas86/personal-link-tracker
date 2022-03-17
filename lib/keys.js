export const keys = {
  db: {
    database: process.env.DATABASE_URL,
    shadowDB: process.env.SHADOW_DATABASE_URL2,
  },
  aws: {
    emailServer: process.env.NEXTAUTH_EMAIL_SERVER,
    emailFrom: process.env.NEXTAUTH_EMAIL_FROM,
    s3Bucket: process.env.NEXT_PUBLIC_AWS_S3BUCKET_NAME3,
    accessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID3,
    secretKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY2,
    region: process.env.NEXT_PUBLIC_AWS_REGION3,
  },
  google: {
    clientID: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
    secretKey: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
  },
  github: {
    clientID: process.env.NEXTAUTH_GITHUB_ID,
    secretKey: process.env.NEXTAUTH_GITHUB_SECRET,
  },
};
