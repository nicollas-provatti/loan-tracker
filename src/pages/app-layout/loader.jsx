import { redirect } from "react-router";
import { getCurrentUser } from "../../services/auth";
import { getLoans } from "../../services/loans";
import { getPayments } from "../../services/payments";

export async function appLoader() {
  const user = await getCurrentUser();

  if (!user) {
    throw redirect("/login");
  }

  const [loans, payments] = await Promise.all([getLoans(), getPayments()]);

  return {
    user,
    loans,
    payments,
  };
}