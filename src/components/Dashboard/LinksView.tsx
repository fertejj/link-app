import React, { useState } from "react";
import useLinks from "../../hooks/useLinks";

const LinksView: React.FC = () => {
  const { links, loading, handleAddLink, handleUpdateLink, handleDeleteLink } = useLinks();
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addNewLink = () => {
    if (newTitle && newUrl) {
      handleAddLink(newTitle, newUrl);
      setNewTitle("");
      setNewUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Tus Enlaces</h1>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Agregar Nuevo Enlace</h2>
          <input
            type="text"
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addNewLink}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Agregar Enlace
          </button>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Lista de Enlaces</h2>
          {loading ? (
            <p className="text-center text-gray-500">Cargando enlaces...</p>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                className="p-4 mb-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{link.title}</h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateLink(
                        link.id,
                        prompt("Nuevo título:", link.title) || link.title,
                        prompt("Nueva URL:", link.url) || link.url
                      )
                    }
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksView;
