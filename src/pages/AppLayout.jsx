import { Outlet, useLoaderData, Navigate, redirect } from "react-router";
import LoansProvider from "../context/loans/loans-provider";
import PaymentsProvider from "../context/payments/payments-provider";

import { getCurrentUser } from "../services/auth";
import { getLoans } from "../services/loans";
import { getPayments } from "../services/payments";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

function AppLayout() {
  const { user } = useLoaderData();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <LoansProvider>
      <PaymentsProvider>
        <Header />
        <main className="min-h-[calc(100vh-100px)] p-5 bg-background">
          <Outlet />
        </main>
        <Footer />
      </PaymentsProvider>
    </LoansProvider>
  );
}

export async function appLoader() {
  const user = await getCurrentUser();

  if (!user) {
    throw redirect("/login");
  }

  const [loans, payments] = await Promise.all([getLoans(), getPayments()]);

  return {
    user,
    loans,
    payments,
  };
}

export default AppLayout;
