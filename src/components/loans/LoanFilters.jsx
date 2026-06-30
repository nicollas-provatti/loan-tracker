import { useState } from "react";

function LoanFilters() {
  const filters = ["Todos", "Ativos", "Quitados"];
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`
        px-4 py-2 rounded-full text-sm font-medium
        transition-colors cursor-pointer

        ${
          activeFilter === filter
            ? "bg-primary text-white"
            : "bg-background border border-border text-text hover:bg-surface"
        }
      `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default LoanFilters;
