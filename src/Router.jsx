import { createBrowserRouter } from "react-router";

import AppLayout from "./pages/app-layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AllUpcomingPayments from "./pages/all-upcoming-payments/AllUpcomingPayments";
import PaymentsHistory from "./pages/payments-history/PaymentsHistory";
import Loans from "./pages/loans/Loans";
import LoanDetails from "./pages/loan-details/LoanDetails";
import EditLoan from "./pages/edit-loan/EditLoan";
import NewLoan from "./pages/new-loan/NewLoan";
import NewPayment from "./pages/new-payment/NewPayment";
import Simulator from "./pages/simulator/Simulator";
import Login from  "./pages/login/Login";
import Register from "./pages/register/Register";

import { appLoader } from "./pages/app-layout/loader";
import { registerAction } from "./pages/register/action";
import { loginAction } from "./pages/login/action";
import { newLoanAction } from "./pages/new-loan/action";
import { newPaymentLoader } from "./pages/new-payment/loader";
import { editLoanLoader } from "./pages/edit-loan/loader";
import { editLoanAction } from "./pages/edit-loan/action";

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <AppLayout />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-upcoming-payments",
        element: <AllUpcomingPayments />,
      },
      {
        path: "payments-history",
        element: <PaymentsHistory />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "loans/:id",
        element: <LoanDetails />,
      },
      {
        path: "loans/new-loan",
        element: <NewLoan />,
        action: newLoanAction,
      },
      {
        path: "loans/edit-loan/:loanId",
        element: <EditLoan />,
        loader: editLoanLoader,
        action: editLoanAction,
      },
      {
        path: "loans/new-payment/:loanId",
        element: <NewPayment />,
        action: newPaymentLoader,
      },
      {
        path: "simulator",
        element: <Simulator />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);
