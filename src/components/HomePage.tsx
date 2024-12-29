import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage: React.FC = () => {
const {user} = useAuth();

    if(user) {
        return(
            <Navigate to="/dashboard" />
        )
    }    

  return (
    <div className="min-h-screen flex flex-col pt-14">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Conecta, Comparte y Crece con LinkApp
          </h1>
          <p className="mb-6">
            Crea tu página personalizada de enlaces para mostrar todo tu
            contenido en un solo lugar.
          </p>
          <Link to='/register'
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100"
          >
            Comienza Gratis
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100  py-10 px-2">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            ¿Por qué elegir EnlacesApp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Enlaces Personalizables
              </h3>
              <p>
                Diseña tu página con temas únicos y widgets que reflejen tu
                estilo.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Analíticas Avanzadas
              </h3>
              <p>Rastrea clics e interacciones con detalles precisos.</p>
            </div>
            <div className="p-6 shadow-lg rounded bg-white">
              <h3 className="text-xl font-semibold mb-2">
                Integración Perfecta
              </h3>
              <p>
                Conecta con tus plataformas favoritas y comparte en todos lados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-100 py-20 px-2">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Elige tu Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 shadow-lg rounded bg-white">
              <h3 className="text-xl font-semibold mb-2">Gratis</h3>
              <p>Funciones básicas para uso personal.</p>
              <p className="text-2xl font-bold mb-4">$0/mes</p>
              <a
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Regístrate
              </a>
            </div>
            <div className="p-6 shadow-lg rounded bg-white">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p>Herramientas avanzadas para profesionales.</p>
              <p className="text-2xl font-bold mb-4">$9.99/mes</p>
              <a
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Obtener Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 EnlacesApp. Todos los derechos reservados.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Términos del Servicio
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
