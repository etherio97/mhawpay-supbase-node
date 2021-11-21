import cors from "cors";
import express from "express";
import { PORT } from "./config";
import { router } from "./routes";
import { errorHandler } from "./src/error-handler";

const app = express();

app.use(cors());

app.use(router);

app.use(errorHandler);

app.all("*", (req, res) => res.status(404).send("Not Found"));

app.listen(PORT, () =>
  console.log("app is running on http://localhost:%d", PORT)
);
