import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { btnOutline, btnPrimary } from "../utils/ui";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"
  }`;

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-800 no-underline hover:text-slate-800"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-extrabold text-white">
            E
          </span>
          MyEventManager
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 rounded bg-slate-800" />
          <span className="block h-0.5 w-6 rounded bg-slate-800" />
          <span className="block h-0.5 w-6 rounded bg-slate-800" />
        </button>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-16 right-0 left-0 flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 shadow-md md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:p-0 md:shadow-none`}
        >
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
            Events
          </NavLink>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <NavLink to="/create-event" className={navLinkClass} onClick={closeMenu}>
                  Create Event
                </NavLink>
              )}

              <span className="flex items-center gap-2 text-sm text-slate-500">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
                {user?.name}
                {isAdmin && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-600 uppercase">
                    Admin
                  </span>
                )}
              </span>

              <button
                type="button"
                className={`${btnOutline} px-4 py-2 text-xs`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                Login
              </NavLink>
              <Link
                to="/register"
                className={`${btnPrimary} px-4 py-2 text-xs no-underline`}
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
