import axios from "axios";
import { FIREBASE_API } from "../config";

export function verifyIdToken(idToken) {
  validateIdToken(idToken);
  let endpointUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
    FIREBASE_API;
  return axios.post(endpointUrl, { idToken }).then(({ data }) => data.users[0]);
}

export function validateIdToken(token) {
  try {
    let [, payload] = token.split(".");
    return JSON.parse(Buffer.from(payload, "base64").toString("ascii"));
  } catch (e) {
    throw e.message;
  }
}
