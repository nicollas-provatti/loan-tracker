import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";

import { formatCurrency } from "../../utils/formatCurrency";

function LoanCard({ loan, nextDueDate }) {
  const {
    id,
    name,
    remaining,
    paidInstallments,
    installments,
    isPaidOff,
  } = loan;

  const progress =
    installments > 0 ? (paidInstallments / installments) * 100 : 0;

  const formattedProgress = `${paidInstallments}/${installments}`;

  return (
    <Link
      to={`/loans/${id}`}
      className="
        block
        w-full
        rounded-xl
        border
        border-border
        bg-surface
        p-4
        text-left
        transition-all
        hover:border-primary
        hover:shadow-md
        cursor-pointer
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-text">{name}</h3>

          {!isPaidOff ? (
            <>
              <p className="mt-2 text-2xl font-bold text-primary">
                {formatCurrency(remaining)}
              </p>
              <p className="text-sm text-text-muted">restantes</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-2xl font-bold text-green">Quitado</p>
              <p className="text-sm text-text-muted">empréstimo finalizado</p>
            </>
          )}
        </div>

        <FiChevronRight size={20} className="text-text-muted" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="w-full">
          <div className="mb-2 flex justify-between gap-2 text-xs text-text-muted">
            <span>{formattedProgress} parcelas</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 rounded-full bg-background">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span
          className={`
            ml-3
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${isPaidOff ? "bg-green/10 text-green" : "bg-yellow/10 text-yellow"}
          `}
        >
          {isPaidOff ? "Quitado" : "Ativo"}
        </span>
      </div>
      {!isPaidOff && (
        <div className="mt-3 text-sm">
          <span className="text-text-muted">Próximo vencimento:</span>

          <span className="ml-2 font-medium text-text">{nextDueDate}</span>
        </div>
      )}
    </Link>
  );
}

export default LoanCard;
