import { FiBarChart2 } from "react-icons/fi";

import { getOverviewData } from "../../utils/selectores";
import { formatCurrency } from "../../utils/formatCurrency";

function Overview({ loans, payments }) {
  const {
    openCapital,
    totalReceivable,
    monthlyReceivables,
    monthlyProfit,
    receivedThisMonth,
    profitReceivedThisMonth,
  } = getOverviewData(loans, payments);

  return (
    <>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiBarChart2 size={24} />
        Visão Geral
      </h2>

      <div className="space-y-6">
        <div className="grid gap-4">
          <OverviewCard text="Capital em Aberto" value={openCapital} />

          <OverviewCard text="A Receber" value={totalReceivable} />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
            Projeção Mensal
          </h3>

          <div className="grid gap-4">
            <OverviewCard
              text="Recebimentos Previstos"
              value={monthlyReceivables}
            />

            <OverviewCard text="Lucro Previsto" value={monthlyProfit} />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
            Resultado do Mês
          </h3>

          <div className="grid gap-4">
            <OverviewCard text="Recebido no Mês" value={receivedThisMonth} />

            <OverviewCard
              text="Lucro Recebido"
              value={profitReceivedThisMonth}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function OverviewCard({ text, value }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 transition-transform hover:scale-103">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-muted">{text}</h3>

        <span className="text-lg font-bold text-primary">
          {formatCurrency(value)}
        </span>
      </div>
    </div>
  );
}

export default Overview;
