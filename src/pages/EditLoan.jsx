import { redirect, useLoaderData } from "react-router";
import FormLoan from "../components/FormLoan";
import { getLoan, updateLoan } from "../services/loans";

function EditLoan() {
  const loan = useLoaderData();

  return <FormLoan editMode={true} loan={loan} />;
}

export async function editLoanLoader({ params }) {
  const loan = await getLoan(params.loanId);

  return loan;
}

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

export default EditLoan;
