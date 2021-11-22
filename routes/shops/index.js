import { Router, json } from "express";
import { supabase } from "../../src/supabase";

export const router = Router();

router.use(json());

router.get("/", async (req, res) => {
  const { uid } = req.auth;
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("user_id", uid);
  if (error) {
    return res.status(400).json(error);
  }
  res.json(data);
});

router.post("/", async (req, res) => {
  const { uid } = req.auth;
  const { name, slug, status, avatar_url, cover_url } = req.body;
  const shopData = {
    name,
    slug,
    avatar_url,
    cover_url,
    status,
    user_id: uid,
  };
  const { error } = await supabase.from("shops").insert(shopData);
  if (error) {
    return res.status(400).json(error);
  }
  res.status(201).json({ success: true });
});

router.get("/:shop_id", async (req, res) => {
  const { uid } = req.auth;
  const { shop_id } = req.params;
  const { data, error } = await supabase
    .from("shops")
    .select("*")
    .eq("id", shop_id)
    .eq("user_id", uid);
  if (error) {
    return res.status(400).json(error);
  }
  if (!data.length) {
    return res.status(404).json({ error: "shop-not-found" });
  }
  res.json(data[0]);
});

router.post("/:shop_id", async (req, res) => {
  const { uid } = req.auth;
  const { shop_id } = req.params;
  const { name, slug, status, avatar_url, cover_url } = req.body;
  const shopData = {
    name,
    slug,
    avatar_url,
    cover_url,
    status,
  };
  const { data, error } = await supabase
    .from("shops")
    .update(shopData)
    .eq("user_id", uid)
    .eq("id", shop_id);
  if (error) {
    return res.json({ error: error.message });
  }
  res.status(200).json(data);
});

router.get("/:shop_id/products", async (req, res) => {
  const { uid } = req.auth;
  const { shop_id } = req.params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("shop_id", shop_id)
    .eq("user_id", uid);
  if (error) {
    return res.status(400).json(error);
  }
  res.json(data);
});
