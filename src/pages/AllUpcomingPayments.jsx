import { useRouteLoaderData } from "react-router";

import { getUpcomingPayments } from "../utils/selectores";

import { FiCalendar } from "react-icons/fi";

import Section from "../components/Section";
import UpcomingPaymentsCard from "../components/dashboard/UpcomingPaymentsCard";

function AllUpcomingPayments() {
  const { loans, payments } = useRouteLoaderData("app");

  const upcomingPayments = getUpcomingPayments(loans, payments);
  const hasPayments = upcomingPayments && upcomingPayments.length > 0;

  return (
    <Section>
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-accent">
            <FiCalendar size={24} />
            Próximos Vencimentos
          </h2>

          <p className="text-sm text-text-muted">
            Lista completa de pagamentos futuros
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          {!hasPayments ? (
            <div className="py-4 text-center">
              <p className="font-medium text-text">
                Nenhum vencimento futuro encontrado.
              </p>

              <p className="mt-1 text-sm text-text-muted">
                Os próximos pagamentos aparecerão aqui quando houver empréstimos ativos.
              </p>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-border">
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
          )}
        </div>
      </div>
    </Section>
  );
}

export default AllUpcomingPayments;