import { createContext } from "react";

export const LoansContext = createContext({
  loans: [],
  addLoan: () => {},
  editLoan: () => {},
});
