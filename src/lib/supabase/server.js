export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase backend configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.",
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function getSupabaseAuthClient() {
  const key = supabaseAnonKey || supabaseServiceRoleKey;

  if (!supabaseUrl || !key) {
    throw new Error(
      "Missing Supabase auth configuration. Set SUPABASE_URL and SUPABASE_ANON_KEY in your environment.",
    );
  }

  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
