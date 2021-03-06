import { keys } from "../../lib/keys";
import prisma from "../../lib/prisma";
import { s3 } from "../../lib/s3Client";

const bucketKeyParams = (s3Key) => {
  return {
    Bucket: keys.aws.s3Bucket,
    Key: s3Key,
  };
};

// read;
export const Get = async (res) => {
  let contents = [];
  contents.length = 0;

  await prisma.category.findMany().then(async (r) => {
    if (r.length >= contents.length) {
      let promises = r.map(async (item) => {
        const { s3BucketKey, id, title, description } = item;
        await s3
          .getObject(bucketKeyParams(s3BucketKey))
          .promise()
          .then((re) => {
            contents.push({
              id,
              title,
              description,
              image: re.Body.toString("base64"),
            });
          });
      });

      Promise.all(promises).then(() => {
        res.json({
          data: contents,
          status: 200,
          message: "All data retrieved successfully",
        });
      });
    }
  });
};

// update;
// export const Put = async (body, res) => {
//   await prisma.category
//     .update({
//       where: { id: body.id },
//       data: { title: body.title, description: body.content },
//     })
//     .then(async () => {
//       const params = {
//         Bucket: keys.aws.s3Bucket,
//         Key: `category/${body.title}.jpeg`,
//         Body: base64Data(body.image),
//         ACL: "public-read",
//         ContentEncoding: "base64",
//         ContentType: `image/jpeg`,
//       };
//       s3.deleteObject(goParams(body.title), async (err) => {
//         if (err) {
//           console.log("err", err);
//         } else {
//           await s3
//             .upload(params)
//             .promise()
//             .then(async (re) => {
//               const { Key, Location } = re;
//               await prisma.category
//                 .update({
//                   where: { id: body.id },
//                   data: { s3BucketKey: Key, image: Location },
//                 })
//                 .then(() => {
//                   res.json({
//                     status: 200,
//                     message: "Data successfully updated",
//                   });
//                 });
//             });
//         }
//       });
//     });
// };
