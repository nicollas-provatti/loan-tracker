import { useContext } from "react";
import { LoansContext } from "./loans-context";

function useLoans() {
  return useContext(LoansContext);
}

export default useLoans;
