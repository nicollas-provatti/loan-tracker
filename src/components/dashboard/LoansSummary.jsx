import { Link } from "react-router";
import { FiCreditCard } from "react-icons/fi";

import { getLoansSummary, getLoansPreview } from "../../utils/selectores";
import { formatCurrency } from "../../utils/formatCurrency";

function LoansSummary({ loans, payments }) {
  const { total, actives, paidOff } = getLoansSummary(loans, payments);

  const loansPreview = getLoansPreview(loans, payments, 5);

  return (
    <>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiCreditCard size={24} />
        Empréstimos
      </h2>

      <div className="border border-border rounded-xl p-5 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-text-muted">
              Número total de empréstimos
            </p>

            <span className="text-3xl font-bold text-text">{total}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className="
                px-3
                py-1
                rounded-full
                bg-red/10
                text-red
              
                text-sm
                font-medium
              "
            >
              {actives} ativos
            </span>

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-green/10
                text-green
                text-sm
                font-medium
              "
            >
              {paidOff} quitados
            </span>
          </div>
        </div>

        {loansPreview.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-background p-6 text-center">
            <p className="font-medium text-text">
              Nenhum empréstimo cadastrado.
            </p>

            <p className="mt-1 text-sm text-text-muted">
              Crie seu primeiro empréstimo para começar o acompanhamento.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1 divide-y divide-border">
              {loansPreview.map((loan) => {
                const {
                  id,
                  name,
                  remaining,
                  paidInstallments,
                  installments,
                  isPaidOff,
                } = loan;

                return (
                  <LoanPreviewCard
                    key={id}
                    name={name}
                    remaining={remaining}
                    paidInstallments={paidInstallments}
                    installments={installments}
                    isPaidOff={isPaidOff}
                  />
                );
              })}
            </div>

            <Link
              to="/loans"
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
              Ver todos os empréstimos
            </Link>
          </>
        )}
      </div>
    </>
  );
}

function LoanPreviewCard({
  name,
  remaining,
  paidInstallments,
  installments,
  isPaidOff,
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-text">{name}</p>

        <p className="text-sm text-text-muted">
          {paidInstallments}/{installments} parcelas pagas
        </p>
      </div>

      <div className="text-right">
        {isPaidOff ? (
          <>
            <p className="font-semibold text-green">Quitado</p>

            <p className="text-xs text-text-muted">✓ Finalizado</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-text">
              {formatCurrency(remaining)}
            </p>

            <p className="text-xs text-text-muted">Em aberto</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoansSummary;
