import React from "react";
import { Link } from "../../models/Link";

type LinksListProps = {
  links: Link[];
  loading: boolean;
  onUpdateLink: (id: string, newTitle: string, newUrl: string) => void;
  onDeleteLink: (id: string) => void;
};

const LinksList: React.FC<LinksListProps> = ({ links, loading, onUpdateLink, onDeleteLink }) => {
  return (
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
                  onUpdateLink(
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
                onClick={() => onDeleteLink(link.id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LinksList;