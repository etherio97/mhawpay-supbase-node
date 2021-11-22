import cors from "cors";
import express from "express";
import helmet from "helmet";
import { PORT } from "./config";
import { router } from "./routes";
import { errorHandler } from "./src/error-handler";
import "./src/admin";
import axios from "axios";
import { writeFileSync, existsSync } from "fs";

const app = express();

if (process.env.NODE_ENV === "production") {
  let serviceAccount = [process.cwd(), "serviceAccount.json"].join("/");
  existsSync(serviceAccount) ||
    axios
      .get(process.env.FIREBASE_SERVICE_ACCOUNT)
      .then(({ data }) =>
        writeFileSync(serviceAccount, JSON.stringify(data), "utf-8")
      );
}

app.use(helmet());

app.use(cors());

app.use(router);

app.use(errorHandler);

app.all("*", (req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(PORT, () =>
  console.log("app is running on http://localhost:%d", PORT)
);
