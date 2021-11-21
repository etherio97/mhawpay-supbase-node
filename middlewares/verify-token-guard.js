import { verifyIdToken } from "../src/firebase";

export async function verifyTokenGuard(req, res, next) {
  let token;
  if ("authorization" in req.headers) {
    token = req.headers["authorization"].replace(/^bearer\s/i, "");
  }
  if (!token) return next({ status: 401, message: "Unauthorized" });
  try {
    req.auth = await verifyIdToken(token);
    if (!("uid" in req.auth)) {
      req.auth.uid = req.auth.localId;
    }
    if ("customAttributes" in req.auth) {
      req.auth.customClaims = JSON.parse(req.auth.customAttributes);
    }
    if (req.auth.disabled) {
      return next({ error: 403, message: "Accout disabled" });
    }
    next();
  } catch (e) {
    next({ status: 400, message: e });
  }
}
