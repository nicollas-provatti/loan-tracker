//import { FaMoneyCheck } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FiTrendingUp } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { signOut } from "../../services/auth";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

function Header() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const navigate = useNavigate();

  function handleToggleNav(value) {
    setIsOpenNav(value);
  }

  function handleSignOut() {
    signOut();
    navigate("/login");
  }

  return (
    <header
      className="
        sticky
        top-0
        z-10
        bg-surface
        border-b
        border-border
        shadow-xs
      "
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-primary
              text-white
            "
          >
            <FiTrendingUp size={22} />
          </div>

          <div>
            <h1 className="font-bold text-accent">LoanControl</h1>

            <p className="text-xs text-text-muted">Gestão de Empréstimos</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="
            flex
            items-center
            gap-2

            rounded-lg
            border
            border-red/20

            px-4
            py-2

            text-sm
            font-medium
            text-red

            transition-all
            hover:bg-red/10
            hover:border-red/40

            active:scale-[0.98]

            cursor-pointer
            md:order-1
          "
        >
          <FiLogOut size={18} />
          Sair
        </button>

        <button
          className="text-text-muted cursor-pointer hover:text-text transition-colors md:hidden"
          onClick={() => handleToggleNav(true)}
        >
          <FaBars />
        </button>

        <NavMobile isOpen={isOpenNav} onClose={() => handleToggleNav(false)} />

        <NavDesktop />
      </div>
    </header>
  );
}

export default Header;
