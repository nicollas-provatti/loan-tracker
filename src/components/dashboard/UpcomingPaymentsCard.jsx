function UpcomingPaymentsCard({ day, month, name, value }) {
  return (
    <div className="flex items-center justify-between pb-3">
      <div className="flex items-center gap-4">
        <div className="min-w-14 text-center">
          <p className="text-lg font-bold text-text">{day}</p>
          <p className="text-xs text-text-muted uppercase">{month}</p>
        </div>

        <div>
          <p className="font-medium text-text">{name}</p>
        </div>
      </div>

      <span className="font-semibold text-primary">
        R$ {Number(value).toFixed(2)}
      </span>
    </div>
  );
}

export default UpcomingPaymentsCard;
