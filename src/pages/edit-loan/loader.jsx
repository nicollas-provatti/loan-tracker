import { getLoan } from "../../services/loans";

export async function editLoanLoader({ params }) {
  const loan = await getLoan(params.loanId);

  return loan;
}
