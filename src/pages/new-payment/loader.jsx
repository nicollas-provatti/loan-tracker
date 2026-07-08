import { redirect } from "react-router";
import { createPayment } from "../../services/payments";

export async function newPaymentLoader({ request, params }) {
  const formData = await request.formData();
  const { loanId } = params;

  const amountPaid = formData.get("amountPaid");
  const paymentDate = formData.get("paymentDate");
  const notes = formData.get("notes");

  const safeAmount = Number(amountPaid) || 0;

  const payment = {
    loanId,
    amountPaid: safeAmount,
    paymentDate,
    notes,
  };

  createPayment(payment);

  return redirect(`/loans/${loanId}`);
}
