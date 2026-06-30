import { FiUser } from "react-icons/fi";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const amortizationMap = {
  installments: "Parcelado",
  "final-capital": "Capital Final",
};

function LoanSummary({ loan }) {
  const {
    name,
    loanAmount,
    interestRate,
    installments,
    amortization,
    isPaidOff,
    dueDay,
    loanDate,
    received,
    remaining,
  } = loan;

  const installmentAmount =
    loanAmount / installments + loanAmount * interestRate;
  const totalReceivable = remaining + received;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiUser size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-accent">{name}</h2>

            <p className="text-sm text-text-muted">Detalhes do empréstimo</p>
          </div>
        </div>

        <span
          className={`
            w-fit
            rounded-full
            px-3
            py-1
            text-sm
            font-medium
          ${isPaidOff ? "text-green bg-green/10" : "text-yellow bg-yellow/10"}
          `}
        >
          {isPaidOff ? "Quitado" : "Ativo"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard label="Valor Emprestado" value={formatCurrency(loanAmount)} />

        <InfoCard
          label="Valor a Receber"
          value={formatCurrency(totalReceivable)}
        />
        <InfoCard
          label="Tipo de Amortização"
          value={amortizationMap[amortization] || amortization}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard label="Vencimento" value={dueDay} />

        <InfoCard label="Data do Empréstimo" value={formatDate(loanDate)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          label="Juros"
          value={`${(interestRate * 100).toFixed(0)}% a.m.`}
        />

        <InfoCard label="Parcelas" value={installments} />

        <InfoCard
          label="Valor da Parcela"
          value={formatCurrency(installmentAmount)}
        />
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-sm text-text-muted">{label}</p>

      <p className="mt-1 text-xl font-semibold text-text">{value}</p>
    </div>
  );
}

export default LoanSummary;
