import React from "react";
import StatusMessage from "../components/StatusMessage";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usePublicPage from "../hooks/usePublicPage";
import useLinks from "../hooks/useLinks";
import useUser from "../hooks/useUser";

const UserPublicPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { publicPage, error } = usePublicPage(username);
  const { links } = useLinks();
  const { currentUser } = useUser();

  if (error) return <StatusMessage message={error} />;
  if (!publicPage) return <StatusMessage message="Cargando..." />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-500 to-teal-700 text-white">
      {/* Encabezado con la imagen de perfil y el título */}
      <div className="flex flex-col items-center mt-8">
        <img
          src={currentUser.photoURL || "/default-profile.png"}
          alt="Perfil"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{publicPage.title}</h1>
      </div>

      {/* Lista de enlaces */}
      <ul className="mt-8 w-full max-w-md space-y-4">
        {links.length > 0 ? (
          links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100"
              >
                <span className="flex-grow text-center font-medium">
                  {link.title}
                </span>
              </a>
            </li>
          ))
        ) : (
          <p className="text-center">No hay enlaces disponibles</p>
        )}
      </ul>

      {/* Íconos de redes sociales */}
      <div className="flex justify-center space-x-4 mt-6">
        {publicPage.socialLinks?.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-200"
          >
            <i className={`fab fa-${social.icon} text-2xl`}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserPublicPage;
