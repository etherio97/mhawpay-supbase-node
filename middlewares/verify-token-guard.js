import admin from "firebase-admin";

export async function verifyTokenGuard(req, res, next) {
  let token;
  if ("authorization" in req.headers) {
    token = req.headers["authorization"].replace(/bearer\s/i, "");
  }
  if (!token) {
    return next({ status: 401, message: "Unauthorized" });
  }
  try {
    req.auth = await admin.auth().verifyIdToken(token);
    if (req.auth.disabled) {
      return next({ error: 403, message: "Accout disabled" });
    }
    next();
  } catch (e) {
    switch (e.code) {
      case "auth/id-token-expired":
        next({ status: 401, message: "Token Expired" });
        break;
      default:
        next({ status: 400, message: "Bad Request" });
    }
  }
}
