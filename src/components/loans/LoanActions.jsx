import { Link } from "react-router";
import { FiCheckCircle, FiEdit, FiDollarSign } from "react-icons/fi";

function LoanActions({ loanId }) {
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-accent">
        <FiCheckCircle size={24} />
        Ações
      </h2>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/loans/new-payment/${loanId}`}
            className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg
              bg-primary
              px-4
              py-3

              font-medium
              text-white

              cursor-pointer

              transition-colors
              hover:bg-primary-dark

              w-full
              sm:w-auto
            "
          >
            <FiDollarSign size={18} />
            Registrar Pagamento
          </Link>

          <Link
            to={`/loans/edit-loan/${loanId}`}
            className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg
              border
              border-border
              bg-surface

              px-4
              py-3

              font-medium
              text-text

              cursor-pointer

              transition-colors
              hover:bg-background

              w-full
              sm:w-auto
            "
          >
            <FiEdit size={18} />
            Editar Empréstimo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoanActions;
