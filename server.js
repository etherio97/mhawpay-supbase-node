import cors from "cors";
import express from "express";
import helmet from "helmet";
import { PORT } from "./config";
import { router } from "./routes";
import { errorHandler } from "./src/error-handler";
import "./src/admin";

const app = express();

app.use(helmet());

app.use(cors());

app.use(router);

app.use(errorHandler);

app.all("*", (req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(PORT, () =>
  console.log("app is running on http://localhost:%d", PORT)
);
