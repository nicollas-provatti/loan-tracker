import { NavLink } from "react-router";

function LinkNav({ path, text, onClick }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `
        px-4
        py-2
        rounded-lg
        text-sm
        font-medium
        transition-colors
        ${isActive ? "bg-primary text-white" : "text-text hover:bg-background"}
      `
      }
    >
      {text}
    </NavLink>
  );
}

export default LinkNav;
