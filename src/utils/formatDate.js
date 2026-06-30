export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = date.getTime() - now.getTime();

  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat("pt-BR", {
    numeric: "auto",
  });

  if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, "day");
  }

  const diffInWeeks = Math.round(diffInDays / 7);

  if (Math.abs(diffInWeeks) < 4) {
    return rtf.format(diffInWeeks, "week");
  }

  const diffInMonths = Math.round(diffInDays / 30);

  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, "month");
  }

  const diffInYears = Math.round(diffInDays / 365);

  return rtf.format(diffInYears, "year");
}

export function formatDate(date) {
  const d = new Date(date);

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
