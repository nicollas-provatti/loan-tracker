import { supabase } from "../lib/supabase";

export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}
export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getCurrentUser() {
  const session = await getCurrentSession();

  return session?.user ?? null;
}
