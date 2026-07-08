import { redirect } from "react-router";
import { updateLoan } from "../../services/loans";

export async function editLoanAction({ request, params }) {
  const formData = await request.formData();
  const { loanId } = params;

  const name = formData.get("name");
  const loanAmount = formData.get("loanAmount");
  const interestRate = formData.get("interestRate");
  const installments = formData.get("installments");
  const amortization = formData.get("amortization");
  const dueDay = formData.get("dueDay");
  const loanDate = formData.get("loanDate");

  const safeAmount = Number(loanAmount) || 0;
  const safeInterest = (Number(interestRate) || 0) / 100;
  const safeInstallments = Number(installments) || 0;

  const loanUpdate = {
    name,
    loanAmount: safeAmount,
    interestRate: safeInterest,
    installments: safeInstallments,
    amortization,
    dueDay,
    loanDate,
  };

  await updateLoan(loanId, loanUpdate);

  return redirect("/loans");
}