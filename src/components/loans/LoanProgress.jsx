import { FiTrendingUp } from "react-icons/fi";

function LoanProgress({ loan }) {
  const { paidInstallments, installments, received, remaining } = loan;
  const progress = (paidInstallments / installments) * 100;

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiTrendingUp size={24} />
        Progresso
      </h2>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-4">
          <p className="text-sm text-text-muted">Parcelas pagas</p>

          <p className="mt-1 text-2xl font-bold text-text">
            {paidInstallments} / {installments}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-text-muted">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-green/10 p-4">
            <p className="text-sm text-text-muted">Recebido</p>

            <p className="mt-1 text-xl font-semibold text-green">
              R$ {received.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg bg-yellow/10 p-4">
            <p className="text-sm text-text-muted">Restante</p>

            <p className="mt-1 text-xl font-semibold text-yellow">
              R$ {remaining.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanProgress;
