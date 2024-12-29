import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-blue-800 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-xl font-bold tracking-wide hover:text-blue-400">
            LinkApp
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="hover:text-blue-400 transition"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/analytics"
                className="hover:text-blue-400 transition"
              >
                Analíticas
              </NavLink>
              <NavLink
                to="/profile"
                className="hover:text-blue-400 transition"
              >
                Perfil
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:text-blue-400 transition"
              >
                Iniciar Sesión
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-blue-400 transition"
              >
                Registrarse
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-icons text-white">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-blue-800 text-white py-4">
          <ul className="space-y-4 px-6">
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/analytics"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Analíticas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block hover:text-red-400"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;
