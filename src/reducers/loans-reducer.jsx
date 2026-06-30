import loans from "../data/loans";

export function initializeLoansState() {
  return {
    loans: [...loans],
  };
}

export function loansReducer(state, action) {
  if (action.type === "ADD_LOAN") {
    return {
      loans: [...state.loans, action.payload],
    };
  }

  if (action.type === "EDIT_LOAN") {
    return {
      ...state,
      loans: loans.state.map((loan) =>
        loan.id === action.payload.id ? action.payload : loan,
      ),
    };
  }
  return state;
}
