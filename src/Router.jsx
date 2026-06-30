import { createBrowserRouter } from "react-router";

import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import AllUpcomingPayments from "./pages/AllUpcomingPayments";
import PaymentsHistory from "./pages/PaymentsHistory";
import Loans from "./pages/Loans";
import LoanDetails from "./pages/LoanDetails";
import NewLoan from "./pages/NewLoan";
import NewPayment from "./pages/NewPayment";
import Simulator from "./pages/Simulator";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { appLoader } from "./pages/AppLayout";
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { newLoanAction } from "./pages/NewLoan";
import { actionNewPayment } from "./pages/NewPayment";

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
        path: "loans/new-payment/:loanId",
        element: <NewPayment />,
        action: actionNewPayment,
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
