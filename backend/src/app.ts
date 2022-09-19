import express from "express";
import "express-async-errors";
import { Response, Request, NextFunction, Router } from "express";
import cors from "cors";

import { AppError } from "./shared/error";
import { personRoutes } from "./modules/person";

const app = express();

// JSON config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// set routes
const routes = Router();
routes.use("/person", personRoutes);

app.use(routes);

// response for unknown requisitions
app.use((req, res) => {
  const notFoundCode = 404;

  return res
    .status(notFoundCode)
    .json(new AppError(notFoundCode, "service not found"));
});

// response for errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError)
    return res
      .status(err.errorCode)
      .json(new AppError(err.errorCode, err.errorMsg));

  return res
    .status(500)
    .json(new AppError(500, `Internal server error - ${err.message}`));
});

export default app;
