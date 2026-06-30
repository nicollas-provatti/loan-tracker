import { formatCurrency } from "../../utils/formatCurrency";

function PaymentCard({ name, date, value }) {
  return (
    <div className="flex items-center justify-between pb-3">
      <div>
        <p className="font-medium text-text">{name}</p>
        <p className="text-sm text-text-muted">{date}</p>
      </div>

      <span className="font-semibold text-green">{formatCurrency(value)}</span>
    </div>
  );
}

export default PaymentCard;