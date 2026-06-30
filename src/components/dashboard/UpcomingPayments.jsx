import { Link } from "react-router";
import { FiCalendar } from "react-icons/fi";

import { getUpcomingPayments } from "../../utils/selectores";

import UpcomingPaymentsCard from "./UpcomingPaymentsCard";

function UpcomingPayments({ loans, payments }) {
  const upcomingPayments = getUpcomingPayments(loans, payments, 3);

  return (
    <>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiCalendar size={24} />
        Próximos Vencimentos
      </h2>

      {upcomingPayments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-background p-6 text-center">
          <p className="font-medium text-text">Nenhum vencimento próximo.</p>

          <p className="mt-1 text-sm text-text-muted">
            Os próximos pagamentos aparecerão aqui quando houver empréstimos
            ativos.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 divide-y divide-border">
            {upcomingPayments.map((payment) => {
              const { id, name, day, month, amount } = payment;

              return (
                <UpcomingPaymentsCard
                  key={id}
                  day={day}
                  month={month}
                  name={name}
                  value={amount}
                />
              );
            })}
          </div>

          <Link
            to="all-upcoming-payments"
            className="
              block
              w-full
              rounded-lg
              border
              border-border
              py-2
              text-center
              text-sm
              font-medium
              text-text
              transition-colors
              hover:bg-background
            "
          >
            Ver todos
          </Link>
        </>
      )}
    </>
  );
}

export default UpcomingPayments;
