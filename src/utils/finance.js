// AUXILIARES
function createLoansMap(loans) {
  return Object.fromEntries(loans.map((loan) => [loan.id, loan]));
}

export function getLoanProgress(loan, payments) {
  const paidInstallments = payments.length;
  const totalInstallments = loan.installments;

  return {
    paidInstallments,
    remainingInstallments: totalInstallments - paidInstallments,
    isCompleted: paidInstallments >= totalInstallments,
    payments: payments,
  };
}

export function getInstallmentSchedule(loan) {
  const schedule = [];

  const [year, month, day] = loan.loanDate.split("-").map(Number); // por causa do fuso horário é preciso construir a data manualmente sem string ISO.

  const loanDate = new Date(year, month - 1, day);

  if (isNaN(loanDate.getTime())) {
    return [];
  }

  // Descobre em qual mês vence a primeira parcela
  let firstMonth = loanDate.getMonth();
  let firstYear = loanDate.getFullYear();

  if (loanDate.getDate() > loan.dueDay) {
    firstMonth++;
  }

  for (let i = 0; i < loan.installments; i++) {
    const date = new Date(firstYear, firstMonth + i, 1);

    const dueDate = createDueDate(
      date.getFullYear(),
      date.getMonth(),
      loan.dueDay,
    );

    schedule.push({
      installment: i + 1,
      dueDate,
      isLast: i === loan.installments - 1,
    });
  }

  return schedule;
}

// DADOS
export function getOpenCapital(loans, payments) {
  let openCapital = 0;

  for (const loan of loans) {
    // filtro
    const loanPayments = payments.filter(
      (payment) => payment.loanId === loan.id,
    );

    const progress = getLoanProgress(loan, loanPayments);

    if (loan.amortization === "installments") {
      const principalPerInstallment = loan.loanAmount / loan.installments;

      const returnedCapital = loanPayments.length * principalPerInstallment;

      openCapital += loan.loanAmount - returnedCapital;
      continue;
    }

    if (loan.amortization === "final-capital") {
      const isCompleted = progress.isCompleted;

      const returnedCapital = isCompleted ? loan.loanAmount : 0;

      openCapital += loan.loanAmount - returnedCapital;
      continue;
    }

    // fallback seguro
    openCapital += loan.loanAmount;
  }

  return openCapital;
}

export function getTotalReceivable(loans, payments) {
  let totalReceivable = 0;

  for (const loan of loans) {

    const loanPayments = payments.filter(
      (payment) => payment.loanId === loan.id,
    );

    const { loanAmount, interestRate, installments } = loan;

    const totalContractValue =
      loanAmount + loanAmount * interestRate * installments;

    const received = loanPayments.reduce(
      (sum, payment) => sum + payment.amountPaid,
      0,
    );

    totalReceivable += totalContractValue - received;
  }

  return totalReceivable;
}

export function getMonthlyReceivables(loans) {
  let total = 0;

  for (const loan of loans) {
    const installment = getInstallmentForMonth(loan);

    if (!installment) continue;

    total += installment.amount;
  }

  return total;
}

export function getMonthlyProfit(loans) {
  let total = 0;

  for (const loan of loans) {
    const installment = getInstallmentForMonth(loan);

    if (!installment) continue;

    total += loan.loanAmount * loan.interestRate;
  }

  return total;
}

export function getReceivedThisMonth(payments) {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return payments.reduce((amount, payment) => {
    const paymentDate = new Date(payment.paymentDate);

    const paymentMonth = paymentDate.getMonth();
    const paymentYear = paymentDate.getFullYear();

    const isCurrentMonth =
      paymentMonth === currentMonth && paymentYear === currentYear;

    if (!isCurrentMonth) return amount;

    return amount + payment.amountPaid;
  }, 0);
}

export function getProfitReceivedThisMonth(loans, payments) {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const loansMap = createLoansMap(loans);

  return payments.reduce((profit, payment) => {
    const paymentDate = new Date(payment.paymentDate);

    const paymentMonth = paymentDate.getMonth();
    const paymentYear = paymentDate.getFullYear();

    const isCurrentMonth =
      paymentMonth === currentMonth && paymentYear === currentYear;

    if (!isCurrentMonth) return profit;

    const loan = loansMap[payment.loanId];

    if (!loan) return profit;

    const installmentInterest = loan.loanAmount * loan.interestRate;

    return profit + installmentInterest;
  }, 0);
}

// CALENDÁRIO
export function getInstallmentForMonth(loan, referenceDate = new Date()) {
  const firstDueDate = new Date(loan.loanDate);

  if (firstDueDate.getDate() > loan.dueDay) {
    firstDueDate.setMonth(firstDueDate.getMonth() + 1);
  }

  firstDueDate.setDate(loan.dueDay);

  // Quantos meses existem entre a primeira parcela e o mês consultado
  const monthsDifference =
    (referenceDate.getFullYear() - firstDueDate.getFullYear()) * 12 +
    (referenceDate.getMonth() - firstDueDate.getMonth());

  // Ainda não começou
  if (monthsDifference < 0) {
    return null;
  }

  // Já terminou
  if (monthsDifference >= loan.installments) {
    return null;
  }

  let amount =
    loan.loanAmount / loan.installments + loan.loanAmount * loan.interestRate;

  if (loan.amortization === "final-capital") {
    const isLastInstallment = monthsDifference === loan.installments - 1;

    amount = isLastInstallment
      ? loan.loanAmount + loan.loanAmount * loan.interestRate
      : loan.loanAmount * loan.interestRate;
  }

  return {
    installmentNumber: monthsDifference + 1,
    amount,
    dueDate: new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      loan.dueDay,
    ),
  };
}

function createDueDate(year, month, dueDay) {
  const lastDay = new Date(year, month + 1, 0).getDate();

  return new Date(year, month, Math.min(dueDay, lastDay));
}

export function getNextDueDate(loan, payments) {
  const loanPayments = payments.filter((payment) => payment.loanId === loan.id);

  const progress = getLoanProgress(loan, loanPayments);

  if (progress.isCompleted) {
    return null;
  }

  const schedule = getInstallmentSchedule(loan);

  const nextInstallment = schedule[progress.paidInstallments];

  if (!nextInstallment) return null;

  return nextInstallment.dueDate;
}
