import { Get, Put } from "../../Helper/api/categoryHelper";

import {
  postController,
  deleteController,
} from "./controllers/categoryControllers";

const Handler = async (req, res) => {
  const { method, body } = req;

  switch (method) {
    // create
    case "POST":
      await postController(body, res);
      break;
    // read;
    case "GET":
      try {
        await Get(res);
      } catch (err) {
        res.json({
          status: 400,
          message: err.message,
        });
      }
      break;
    // update;
    case "PUT":
      try {
        await Put(body, res);
      } catch (err) {
        res.json({
          status: 400,
          message: "Something went wrong",
        });
      }
      break;
    // delete
    case "DELETE":
      try {
        await deleteController(body, res);
      } catch (err) {
        res.json({
          status: 400,
          message: "Something went wrong",
        });
      }

      break;
    default:
      res.json({
        status: 404,
        message: "Something went wrong",
      });
      break;
  }
};

export default Handler;
