import React from "react";
import AddLink from "./AddLink";
import LinksList from "./LinksList";
import useLinks from "../../hooks/useLinks";
import { useAuth } from "../../context/AuthContext";

const LinksView: React.FC = () => {
  const { user } = useAuth(); // Obtenemos el usuario autenticado
  const { links, loading, handleAddLink, handleUpdateLink, handleDeleteLink } = useLinks();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-red-500">
          Debes iniciar sesión para acceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Tus Enlaces</h1>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <AddLink onAddLink={handleAddLink} />
        <LinksList
          links={links}
          loading={loading}
          onUpdateLink={handleUpdateLink}
          onDeleteLink={handleDeleteLink}
        />
      </div>
    </div>
  );
};

export default LinksView;
