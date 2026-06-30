import { Link } from "react-router";

import { formatRelativeDate } from "../../utils/formatDate";

import { FiDollarSign } from "react-icons/fi";
import PaymentCard from "./PaymentCard";

function RecentPayments({ loans, payments }) {
  const recentPayments = payments.slice(0, 3);

  return (
    <>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiDollarSign size={24} />
        Pagamentos Recentes
      </h2>

      {recentPayments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-background p-6 text-center">
          <p className="font-medium text-text">
            Nenhum pagamento registrado.
          </p>

          <p className="mt-1 text-sm text-text-muted">
            Os pagamentos aparecerão aqui conforme forem sendo registrados.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 divide-y divide-border">
            {recentPayments.map((payment) => {
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

          <Link
            to="payments-history"
            className="
              block
              w-full
              rounded-lg
              border
              border-border
              py-2
              text-sm
              text-center
              font-medium
              text-text
              transition-colors
              hover:bg-background
            "
          >
            Ver histórico
          </Link>
        </>
      )}
    </>
  );
}

export default RecentPayments;