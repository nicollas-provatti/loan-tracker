import { useReducer } from "react";
import { LoansContext } from "./loans-context";
import {
  loansReducer,
  initializeLoansState,
} from "../../reducers/loans-reducer";

function LoansProvider({ children }) {
  const [loansState, loansDispatch] = useReducer(
    loansReducer,
    { loans: [] },
    initializeLoansState,
  );

  function handleAddLoan(loan) {
    loansDispatch({ type: "ADD_LOAN", payload: loan });
  }

  function handleEditLoan(loan) {
    loansDispatch({ type: "EDIT_LOAN", payload: loan });
  }

  const ctxValue = {
    loans: loansState.loans,
    addLoan: handleAddLoan,
    editLoan: handleEditLoan,
  };

  return (
    <LoansContext.Provider value={ctxValue}>{children}</LoansContext.Provider>
  );
}

export default LoansProvider;
