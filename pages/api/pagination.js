import {
  Default,
  GetAllLinks,
  GetMyLinks,
} from "./controllers/paginationControllers";
import { getSession } from "next-auth/react";

const Handler = async (req, res) => {
  const { method, query } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      const { _router, _start, _limit } = query;

      // TODO: reformat code to controllers
      switch (_router) {
        case "all-links":
          await GetAllLinks(res, _start, _limit);
          break;
        case "my-links":
          await GetMyLinks(res, session, _start, _limit);
          break;
        default:
          await Default(res);
          break;
      }
      break;
    default:
      await Default(res);
      break;
  }
};

export default Handler;
