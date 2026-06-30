import { useContext } from "react";
import { PaymentsContext } from "./payments-context";

function usePayments() {
  return useContext(PaymentsContext);
}

export default usePayments;