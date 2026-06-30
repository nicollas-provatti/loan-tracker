import { createContext } from "react";

export const PaymentsContext = createContext({
  payments: [],
  addPayment: () => {},
});
