import { useReducer } from "react";
import { PaymentsContext } from "./payments-context";
import {
  paymentsReducer,
  initializePaymentsState,
} from "../../reducers/payments-reducer";

function PaymentsProvider({ children }) {
  const [paymentsState, paymentsDispatch] = useReducer(
    paymentsReducer,
    { payments: [] },
    initializePaymentsState,
  );

  function handleAddPayment(payment) {
    paymentsDispatch({ type: "ADD_PAYMENT", payload: payment });
  }

  const ctxValue = {
    payments: paymentsState.payments,
    addPayment: handleAddPayment,
  };

  return (
    <PaymentsContext.Provider value={ctxValue}>
      {children}
    </PaymentsContext.Provider>
  );
}

export default PaymentsProvider;
