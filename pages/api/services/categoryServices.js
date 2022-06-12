import prisma from "../../../lib/prisma";
import { s3 } from "../../../lib/s3Client";
import { keys } from "../../../lib/keys";

const goParams = (title) => {
  return {
    Bucket: keys.aws.s3Bucket,
    Key: `category/${title}.jpeg`,
  };
};

const params = (title, image) => {
  const base64Data = (image) => {
    return new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
  };

  return {
    Bucket: keys.aws.s3Bucket,
    Key: `category/${title}.${image.split(";")[0].split("/")[1]}`,
    Body: base64Data(image),
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${image.split(";")[0].split("/")[1]}`,
  };
};

// post service
export const postServices = async ({ title, description, image }, res) => {
  await s3
    .upload(params(title, image))
    .promise()
    .then(async (resources) => {
      const { Key, Location } = resources;
      console.log("Location", Location);
      await prisma.category
        .create({
          data: {
            title,
            description,
            s3BucketKey: `${Key}`,
            image: Location,
          },
        })
        .then(() => {
          res.json({
            status: 200,
            message: "Content successfully saved to db",
          });
        });
    });
};

// delete service
export const deleteServices = async ({ id, title }, res) => {
  await prisma.category.delete({ where: { id } }).then(() => {
    s3.deleteObject(goParams(title), (err) => {
      if (err) {
        res.json({
          status: 400,
          message: err.message,
        });
      } else {
        res.json({
          status: 200,
          message: "All objects have successfully been deleted",
        });
      }
    });
  });
};
