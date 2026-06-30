import { FiSearch } from "react-icons/fi";

function LoanSearch() {
  return (
    <div className="relative">
      <FiSearch
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-text-muted
        "
      />

      <input
        type="text"
        placeholder="Buscar por cliente..."
        className="
          w-full
          rounded-lg
          border
          border-border
          bg-surface
          py-3
          pl-10
          pr-4

          text-text
          placeholder:text-text-muted

          outline-none
          transition-colors

          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
        "
      />
    </div>
  );
}

export default LoanSearch;
