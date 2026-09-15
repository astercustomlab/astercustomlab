import { createClient } from "@supabase/supabase-js";

let cachedClient = null;

/**
 * Returns a Supabase client, or null if the project hasn't been configured
 * yet (env vars missing). Keeping it optional means the site — and the
 * contact form — still works before Supabase is set up.
 */
/**
 * Returns a Supabase client, or null if the project hasn't been configured
 * yet (env vars missing). Keeping it optional means the site — and the
 * admin dashboard — still works before Supabase is set up.
 *
 * Accepts either the current key name (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
 * format sb_publishable_...) or the older one (NEXT_PUBLIC_SUPABASE_ANON_KEY,
 * a JWT) — both work the same way with createClient.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!cachedClient) {
    cachedClient = createClient(url, key);
  }

  return cachedClient;
}
