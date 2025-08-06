import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gccofefdmninicrukktz.supabase.co"; // replace with your real project URL
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjY29mZWZkbW5pbmljcnVra3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTI4MTMsImV4cCI6MjA2ODg4ODgxM30.EgKov_ojzPkBlwN5rC5AsFZQP-QshrZ47qaGu9eYSDg"; // replace with your real anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
