import { useRouteLoaderData } from "react-router";

import { formatRelativeDate } from "../utils/formatDate";

import { FiDollarSign } from "react-icons/fi";
import PaymentCard from "../components/dashboard/PaymentCard";
import Section from "../components/Section";

function PaymentsHistory() {
  const { loans, payments } = useRouteLoaderData("app");

  const hasPayments = payments && payments.length > 0;

  return (
    <Section>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-accent">
            <FiDollarSign size={24} />
            Histórico de Pagamentos
          </h2>

          <p className="text-sm text-text-muted">
            Registro completo de todos os pagamentos realizados
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          {!hasPayments ? (
            <div className="py-4 text-center">
              <p className="font-medium text-text">
                Nenhum pagamento registrado ainda.
              </p>

              <p className="mt-1 text-sm text-text-muted">
                Os pagamentos aparecerão aqui quando forem registrados.
              </p>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-border">
              {payments.map((payment) => {
                const { id, loanId, paymentDate, amountPaid } = payment;

                const loan = loans.find((loan) => loan.id === loanId);

                return (
                  <PaymentCard
                    key={id}
                    name={loan.name}
                    date={formatRelativeDate(paymentDate)}
                    value={amountPaid}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export default PaymentsHistory;