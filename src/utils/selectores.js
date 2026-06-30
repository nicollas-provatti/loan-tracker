// Preparar dados para UI
import {
  getLoanProgress,
  getNextDueDate,
  getOpenCapital,
  getTotalReceivable,
  getMonthlyReceivables,
  getMonthlyProfit,
  getReceivedThisMonth,
  getProfitReceivedThisMonth,
} from "./finance";

export function getOverviewData(loans, payments) {
  return {
    openCapital: getOpenCapital(loans, payments),
    totalReceivable: getTotalReceivable(loans, payments),
    monthlyReceivables: getMonthlyReceivables(loans),
    monthlyProfit: getMonthlyProfit(loans),
    receivedThisMonth: getReceivedThisMonth(payments),
    profitReceivedThisMonth: getProfitReceivedThisMonth(loans, payments),
  };
}

export function getLoansSummary(loans, payments) {
  let countActives = 0;

  for (const loan of loans) {
    const loanPayments = payments.filter(
      (payment) => payment.loanId === loan.id,
    );

    const progress = getLoanProgress(loan, loanPayments);

    if (!progress.isCompleted) {
      countActives++;
    }
  }

  const totalLoans = loans.length;
  const activeLoans = countActives;
  const paidOffLoans = totalLoans - activeLoans;

  return {
    total: totalLoans,
    actives: activeLoans,
    paidOff: paidOffLoans,
  };
}

export function getLoansPreview(loans, payments, limit) {
  const preview = loans.map((loan) => {
    const loanPayments = payments.filter(
      (payment) => payment.loanId === loan.id,
    );

    const progress = getLoanProgress(loan, loanPayments);

    const { paidInstallments, isCompleted } = progress;

    const { loanAmount, interestRate, installments, amortization } = loan;

    let remaining;

    if (amortization === "final-capital") {
      const monthlyInterest = loanAmount * interestRate;

      const remainingInterestPayments = installments - paidInstallments - 1;

      remaining =
        Math.max(remainingInterestPayments, 0) * monthlyInterest +
        (isCompleted ? 0 : loanAmount + monthlyInterest);
    } else {
      const installmentValue =
        loanAmount / installments + loanAmount * interestRate;

      remaining = installmentValue * (installments - paidInstallments);
    }

    return {
      id: loan.id,
      name: loan.name,
      remaining,
      paidInstallments,
      installments,
      dueDay: loan.dueDay,
      loanDate: loan.loanDate,
      isPaidOff: isCompleted,
    };
  });

  return typeof limit === "number" ? preview.slice(0, limit) : preview;
}

export function getUpcomingPayments(loans, payments, limit) {
  const activeLoans = loans.filter((loan) => {
    const loanPayments = payments.filter((p) => p.loanId === loan.id);

    const progress = getLoanProgress(loan, loanPayments);

    return !progress.isCompleted;
  });

  const upcoming = activeLoans
    .map((loan) => {
      const loanPayments = payments.filter((p) => p.loanId === loan.id);

      const progress = getLoanProgress(loan, loanPayments);

      let amount;

      if (loan.amortization === "final-capital") {
        const monthlyInterest = loan.loanAmount * loan.interestRate;

        const isLastInstallment =
          progress.paidInstallments + 1 === loan.installments;

        amount = isLastInstallment
          ? loan.loanAmount + monthlyInterest
          : monthlyInterest;
      } else {
        amount =
          loan.loanAmount / loan.installments +
          loan.loanAmount * loan.interestRate;
      }

      const dueDate = getNextDueDate(loan, loanPayments);

      const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
      });

      return {
        id: loan.id,
        name: loan.customerName || loan.name,
        day: String(loan.dueDay).padStart(2, "0"),
        month: monthFormatter.format(dueDate),
        amount,
        dueDate,
      };
    })
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, limit);

  return upcoming;
}

export function getNextDueDateLabel(loan, payments) {
  const dueDate = getNextDueDate(loan, payments);

  if (!dueDate) return null;

  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
  });

  const month = monthFormatter.format(dueDate).toUpperCase();

  const day = String(dueDate.getDate()).padStart(2, "0");

  return `${day} ${month}`;
}

export function getLoanDetails(loans, loanId, payments) {
  const loan = loans.find((loan) => loan.id === Number(loanId));
  
  if (!loan) return;
  
  const loanPayments = payments.filter((payment) => payment.loanId === loan.id);

  const progress = getLoanProgress(loan, loanPayments);

  const {
    name,
    loanAmount,
    interestRate,
    installments,
    amortization,
    dueDay,
    loanDate,
  } = loan;

  const { isCompleted, paidInstallments, remainingInstallments } = progress;

  let installmentAmount = loanAmount / installments + loanAmount * interestRate;
  let remaining = installmentAmount * remainingInstallments;
  let openCapital = loanAmount - (loanAmount / installments) * paidInstallments;
  let projectedProfit = installmentAmount * installments - loanAmount;

  if (amortization === "final-capital") {
    installmentAmount = loanAmount * interestRate;
    remaining = installmentAmount * remainingInstallments + loanAmount;
    openCapital = loanAmount;
    projectedProfit = installmentAmount * installments;
  }

  let received = paidInstallments * installmentAmount;

  const profitReceived = loanAmount * interestRate * paidInstallments;
  const remainingProfit = projectedProfit - profitReceived;

  return {
    name,
    loanAmount,
    interestRate,
    installments,
    amortization,
    isPaidOff: isCompleted,
    dueDay,
    loanDate,
    paidInstallments,
    received,
    remaining,
    openCapital,
    projectedProfit,
    profitReceived,
    remainingProfit,
    payments: loanPayments,
  };
}
