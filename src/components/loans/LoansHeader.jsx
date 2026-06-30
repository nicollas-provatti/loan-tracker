import { Link } from "react-router";
import { FiPlusCircle } from "react-icons/fi";

function LoansHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-accent">Empréstimos</h2>

        <p className="text-sm text-text-muted">
          Gerencie e acompanhe todos os empréstimos registrados.
        </p>
      </div>

      <Link
        to="new-loan"
        className="
          flex
          items-center
          justify-center
          gap-2

          rounded-lg
          bg-primary
          px-4
          py-2

          text-white
          font-medium

          transition-colors
          hover:bg-primary-dark

          cursor-pointer
        "
      >
        <FiPlusCircle size={18} />
        Novo Empréstimo
      </Link>
    </div>
  );
}

export default LoansHeader;
