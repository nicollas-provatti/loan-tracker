import { getLoansPreview, getNextDueDateLabel } from "../../utils/selectores";

import LoanCard from "./LoanCard";

function LoanList({ loans, payments }) {
  const loansPreview = getLoansPreview(loans, payments);

  return (
    <div className="space-y-4">
      {loansPreview.map((loan) => {
        const nextDueDate = getNextDueDateLabel(loan, payments);

        return <LoanCard key={loan.id} loan={loan} nextDueDate={nextDueDate} />;
      })}
    </div>
  );
}

export default LoanList;
