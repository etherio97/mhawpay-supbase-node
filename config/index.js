import { env } from "process";

export const SUPABASE_ANON = env.SUPABASE_ANON;
export const SUPABASE_SECRET = env.SUPABASE_SECRET;
export const SUPABASE_URL = env.SUPABASE_URL;
export const FIREBASE_SERVICE_ACCOUNT = env.FIREBASE_SERVICE_ACCOUNT;
export const FIREBASE_PROJECT_ID = env.FIREBASE_PROJECT_ID;
export const PORT = env.PORT || 3000;
