import { supabase } from "../lib/supabase";

export async function getPayments() {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("paymentDate", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPayment(id) {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createPayment(payment) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("payments")
    .insert({
      ...payment,
      userId: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePayment(id, payment) {
  const { data, error } = await supabase
    .from("payments")
    .update(payment)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deletePayment(id) {
  const { error } = await supabase.from("payments").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
