import { useParams, useRouteLoaderData } from "react-router";

import { getLoanDetails } from "../utils/selectores";

import Section from "../components/Section";
import LoanSummary from "../components/loans/LoanSummary";
import LoanProgress from "../components/loans/LoanProgress";
import PaymentHistory from "../components/loans/PaymentHistory";
import FinancialInfo from "../components/loans/FinancialInfo";
import LoanActions from "../components/loans/LoanActions";

function LoanDetails() {
  const { loans, payments } = useRouteLoaderData("app");

  const { id } = useParams();

  const loanDetails = getLoanDetails(loans, id, payments);

  return (
    <Section>
      <LoanSummary loan={loanDetails} />
      <LoanProgress loan={loanDetails} />
      <PaymentHistory payments={loanDetails.payments} />
      <FinancialInfo loan={loanDetails} />
      <LoanActions loanId={id} />
    </Section>
  );
}

export default LoanDetails;
