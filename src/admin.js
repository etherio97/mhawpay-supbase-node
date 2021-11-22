import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
import { FIREBASE_PROJECT_ID } from "../config";

let app;

if (!app) {
  const serviceAccount = JSON.parse(
    readFileSync(resolve("serviceAccount.json"), "utf-8")
  );

  app = admin.initializeApp({
    projectId: FIREBASE_PROJECT_ID,
    cert: admin.credential.cert(serviceAccount),
  });
}

export default app;
