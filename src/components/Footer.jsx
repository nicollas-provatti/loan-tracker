import { FiTrendingUp } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 sm:flex-row">
        <div className="flex items-center gap-2 text-text-muted">
          <FiTrendingUp size={18} className="text-primary" />
          <span className="text-sm font-medium text-text">LoanControl</span>
        </div>

        <p className="text-xs text-text-muted text-center sm:text-right">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
