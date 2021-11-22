import fileUpload from "express-fileupload";
import { supabase } from "../../src/supabase";
import { Router } from "express";

export const router = Router();

router.use(fileUpload({ limits: { fileSize: 1024 * 5 } }));

router.post("/", async (req, res, next) => {
  try {
    const { image } = req.files || {};
    if (!image) {
      return next({ status: 400, message: "Bad Request" });
    }
    const fileName = [
      Date.now(),
      req.auth.uid,
      image.name.split(".").pop(),
    ].join(".");
    const filePath = [
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
      fileName,
    ].join("/");
    const { data, error } = await supabase.storage
      .from("s0")
      .upload(filePath, image.data);
    if (error) {
      return next({ status: 400, message: error.message });
    }
    res
      .status(201)
      .json(await supabase.storage.from("s0").getPublicUrl(filePath));
  } catch (e) {
    next({ status: 500, message: e.message });
  }
});
