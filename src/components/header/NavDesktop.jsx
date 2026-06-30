import LinkNav from "./LinkNav";

function NavDesktop() {
  return (
    <nav className="hidden items-center gap-2 md:flex">
      <LinkNav path="/" text="Dashboard" />
      <LinkNav path="/loans" text="Empréstimos" />
      <LinkNav path="/simulator" text="Simulador" />
    </nav>
  );
}

export default NavDesktop;
