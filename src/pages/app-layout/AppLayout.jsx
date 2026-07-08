import { Outlet, useLoaderData, Navigate } from "react-router";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

function AppLayout() {
  const { user } = useLoaderData();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-100px)] p-5 bg-background">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}



export default AppLayout;
