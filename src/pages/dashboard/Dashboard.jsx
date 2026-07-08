import { useRouteLoaderData } from "react-router";
import Section from "../../components/shared/Section";
import SectionCard from "../../components/shared/SectionCard";
import Overview from "../../components/dashboard/Overview";
import LoansSummary from "../../components/dashboard/LoansSummary";
import UpcomingPayments from "../../components/dashboard/UpcomingPayments";
import RecentPayments from "../../components/dashboard/RecentPayments";

function Dashboard() {
  const { loans, payments } = useRouteLoaderData("app");

  return (
    <Section display="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      <SectionCard>
        <Overview loans={loans} payments={payments} />
      </SectionCard>

      <SectionCard>
        <LoansSummary loans={loans} payments={payments} />
      </SectionCard>

      <SectionCard>
        <UpcomingPayments loans={loans} payments={payments} />
      </SectionCard>

      <SectionCard>
        <RecentPayments loans={loans} payments={payments} />
      </SectionCard>
    </Section>
  );
}

export default Dashboard;
