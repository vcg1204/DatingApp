import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yhwbyybsfxwjhvyoblyh.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlod2J5eWJzZnh3amh2eW9ibHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjU3NzIsImV4cCI6MjA5NTU0MTc3Mn0.Sx_Wg3QUXOqywroHoRjkO7YHgMkJ74_7YxupCFAtqOI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
