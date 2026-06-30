import { IoMdClose } from "react-icons/io";
import LinkNav from "./LinkNav";

function NavMobile({ onClose, isOpen }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          z-40
          transition-opacity duration-500
          md:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />
      <div
        className={`
          fixed top-0 right-0
          h-full w-2/3 max-w-sm
          bg-surface
          shadow-2xl
          z-50
          md:hidden
          transform
          transition-transform duration-500 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="text-sm font-semibold text-text">Menu</span>

          <button
            onClick={onClose}
            className="text-text-muted cursor-pointer hover:text-text transition-colors"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <LinkNav path="/" text="Dashboard" onClick={onClose} />
          <LinkNav path="/loans" text="Empréstimos" onClick={onClose} />
          <LinkNav path="/simulator" text="Simulador" onClick={onClose} />
        </nav>
      </div>
    </>
  );
}

export default NavMobile;
