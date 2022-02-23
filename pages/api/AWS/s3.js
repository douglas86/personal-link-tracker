import { s3 } from "../../../lib/s3Client";
import { CreateCategory, Params } from "./helpers/s3helpers";
import prisma from "../../../lib/prisma";

const getObject = async (bucket, objectKey) => {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey,
    };
    const data = await s3.getObject(params).promise();
    return data.Body.toString("base64");
  } catch (e) {
    throw new Error(`could not retrieve file from s3: ${e.message}`);
  }
};

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await prisma.category.findMany();

        async function getS3Data() {
          let d;
          const params = {
            Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
          };

          try {
            d = await s3.listObjectsV2(params).promise();
          } catch (e) {
            throw e;
          }
          let content = [];
          let count = 0;
          for (let currentValue of d.Contents) {
            console.log("u", currentValue);
            if (currentValue.Size > 0) {
              let goParams = {
                Bucket: params.Bucket,
                Key: currentValue.Key,
              };
              let data;
              try {
                data = await s3.getObject(goParams).promise();
              } catch (e) {
                throw e;
              }
              content.push({
                id: categories[count].id,
                name: categories[count].name,
                description: categories[count].description,
                Size: data.ContentLength,
                Body: data.Body.toString("base64"),
              });
            }
            count += 1;
          }
          return content;
        }
        res.status(200).json({
          data: await getS3Data(),
        });
      } catch (err) {
        console.log("error", err);
      }
      break;
    case "POST":
      try {
        const { title, description, image } = body;
        const base64Data = new Buffer.from(
          image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const type = image.split(";")[0].split("/")[1];

        const params = Params(title, type, base64Data);
        await s3
          .upload(params)
          .promise()
          .then((resources) => {
            const { Key, Location } = resources;
            CreateCategory(title, description, Key, Location);
          })
          .catch((err) => console.log("error", err));
        res.status(200).json({
          message: "You have successfully saved to the db",
        });
      } catch (err) {
        res.status(400).json({
          message: "There was an error saving your data",
        });
      }
      break;
    default:
      res.status(400).json({
        message: "You have not provided the correct details to be stored",
      });
      break;
  }
}
