import { FiPieChart } from "react-icons/fi";

import { formatCurrency } from "../../utils/formatCurrency";

function FinancialInfo({ loan }) {
  const { openCapital, projectedProfit, profitReceived, remainingProfit } =
    loan;
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiPieChart size={24} />
        Informações Financeiras
      </h2>

      <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
        <div className="flex justify-between">
          <span className="text-text-muted">Capital em aberto</span>
          <span className="font-semibold text-text">
            {formatCurrency(openCapital)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Lucro previsto</span>
          <span className="font-semibold text-text">
            {formatCurrency(projectedProfit)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Lucro recebido</span>
          <span className="font-semibold text-green">
            {formatCurrency(profitReceived)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-muted">Lucro restante</span>
          <span className="font-semibold text-yellow">
            {formatCurrency(remainingProfit)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FinancialInfo;
