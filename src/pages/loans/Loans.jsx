import { useRouteLoaderData } from "react-router";
import Section from "../../components/shared/Section";
import LoansHeader from "../../components/loans/LoansHeader";
import LoanSearch from "../../components/loans/LoanSearch";
import LoanFilters from "../../components/loans/LoanFilters";
import LoanList from "../../components/loans/LoanList";

function Loans() {
  const { loans, payments } = useRouteLoaderData("app");

  const hasLoans = loans && loans.length > 0;

  return (
    <Section>
      <LoansHeader />

      {!hasLoans ? (
        <div className="mt-6 rounded-lg border border-dashed border-border bg-background p-6 text-center">
          <p className="font-medium text-text">
            Nenhum empréstimo cadastrado ainda.
          </p>

          <p className="mt-1 text-sm text-text-muted">
            Crie seu primeiro empréstimo para começar a acompanhar os pagamentos.
          </p>
        </div>
      ) : (
        <>
          <LoanSearch />
          <LoanFilters />
          <LoanList loans={loans} payments={payments} />
        </>
      )}
    </Section>
  );
}

export default Loans;