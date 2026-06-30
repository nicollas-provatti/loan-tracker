import payments from "../data/payments";

export function initializePaymentsState() {
  return {
    payments,
  };
}

export function paymentsReducer(state, action) {
  if (action.type == "ADD_PAYMENT") {
    return {
      payments: [action.payload, ...state.payments, ],
    };
  }
  return state;
}
