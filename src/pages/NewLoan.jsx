import { redirect } from "react-router";
import FormLoan from "../components/FormLoan";
import { createLoan } from "../services/loans";

function NewLoan() {
  return <FormLoan />;
}

export async function newLoanAction({ request }) {
  const formData = await request.formData();

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

  const newLoan = {
    name,
    loanAmount: safeAmount,
    interestRate: safeInterest,
    installments: safeInstallments,
    amortization,
    dueDay,
    loanDate,
  };

  await createLoan(newLoan);

  return redirect("/loans");
}

export default NewLoan;
