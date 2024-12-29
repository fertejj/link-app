import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el usuario autenticado

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white">
      {/* Contenedor Principal */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-lg font-bold">
          <NavLink to="/" className="hover:underline">
            Link Manager
          </NavLink>
        </h1>

        {/* Botón Hamburguesa */}
        <button
          className="lg:hidden absolute top-4 right-4 z-50 text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path 
                className="hidden"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Menú de Navegación */}
        <div
          ref={menuRef}
          className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static bg-blue-600 w-full lg:w-auto left-0 lg:left-auto top-0 lg:top-auto transition-all duration-300 z-10 ${
            isMenuOpen ? "block absolute z-0 top-12" : "hidden"
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-4 items-center space-y-4 lg:space-y-0 p-4 lg:p-0">
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block hover:underline transition duration-200"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/analytics"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block hover:underline transition duration-200"
                  >
                    Analíticas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block hover:underline transition duration-200"
                  >
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <button

                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen)
                      handleLogout()
                    }}
                    className="block hover:underline transition duration-200"
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
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block hover:underline transition duration-200"
                  >
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block hover:underline transition duration-200"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
