import { Router } from "express";
import { supabase } from "../../src/supabase";

export const router = Router();

router.get("/:shop_id", async (req, res) => {
  const { uid } = req.auth;
  const { shop_id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", uid)
    .eq("shop_id", shop_id);
  if (error) {
    return res.status(404).json(error);
  }
  res.json(data);
});
