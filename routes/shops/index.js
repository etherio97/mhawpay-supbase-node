import { Router } from "express";
import { supabase } from "../../src/supabase";

export const router = Router();

router.get("/", async (req, res) => {
  console.log(req.auth);
  const { uid } = req.auth;
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("user_id", uid);
  if (error) {
    return res.status(404).json(error);
  }
  res.json(data);
});
