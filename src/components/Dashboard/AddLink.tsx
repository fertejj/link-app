import React, { useState } from "react";

type AddLinkProps = {
  onAddLink: (title: string, url: string) => void;
};

const AddLink: React.FC<AddLinkProps> = ({ onAddLink }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddClick = () => {
    if (newTitle && newUrl) {
      onAddLink(newTitle, newUrl);
      setNewTitle("");
      setNewUrl("");
    }
  };

  return (
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
        onClick={handleAddClick}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Agregar Enlace
      </button>
    </div>
  );
};

export default AddLink;