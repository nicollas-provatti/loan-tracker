import { supabase } from "../lib/supabase";

export async function getLoans() {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .order("loanDate", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getLoan(id) {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createLoan(loan) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("loans")
    .insert({
      ...loan,
      userId: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function updateLoan(id, loan) {
  const { data, error } = await supabase
    .from("loans")
    .update(loan)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteLoan(id) {
  const { error } = await supabase
    .from("loans")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}