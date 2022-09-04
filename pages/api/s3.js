import { GetController } from "./controllers/s3Controllers";

const Handler = async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const { s3BucketKey } = query;
      GetController(res, s3BucketKey);
      break;
    default:
      break;
  }
};

export default Handler;
