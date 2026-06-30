import { FiDollarSign } from "react-icons/fi";

import { formatDate } from "../../utils/formatDate";

function PaymentHistory({ payments }) {
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiDollarSign size={24} />
        Histórico de Pagamentos
      </h2>

      {payments.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <p className="text-text-muted">Nenhum pagamento registrado.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface">
          {payments.toReversed().map((payment, index) => (
            <div
              key={payment.id}
              className={`
              flex items-center justify-between p-4
              ${index !== payments.length - 1 ? "border-b border-border" : ""}
            `}
            >
              <div>
                <p className="font-medium text-text/80">Parcela {index + 1}</p>
              </div>

              <div>
                <p className="font-normal text-text">
                  {formatDate(payment.paymentDate)}
                </p>
              </div>

              <span className="font-semibold text-green">
                R$ {payment.amountPaid.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
