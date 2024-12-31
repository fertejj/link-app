// pages/UserPublicPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import usePublicPage from "../hooks/usePublicPage";
import useLinks from "../hooks/useLinks";
import StatusMessage from "../components/StatusMessage";

const UserPublicPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { publicPage, error } = usePublicPage(username);
  const { links } = useLinks();

  if (error) return <StatusMessage message={error} />;
  if (!publicPage) return <StatusMessage message="Cargando..." />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800">{publicPage.title}</h1>
      <ul className="mt-6 space-y-4">
        {links.length > 0 ? (
          links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-700">No hay enlaces disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default UserPublicPage;
