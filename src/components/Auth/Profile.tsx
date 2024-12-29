import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth(); // Accede al usuario desde el contexto

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Por favor, inicia sesión para ver tu perfil.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Perfil del Usuario
        </h1>
          <div className="">
            <label className="block text-sm font-medium text-center text-gray-700">
              Foto de Perfil:
            </label>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Foto de Perfil"
                className="w-24 h-24 mt-2 rounded-full mx-auto"
              />
            ) : (
              <p className="text-gray-900">No disponible</p>
            )}
          </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <p className="text-gray-900">{user.displayName || "No disponible"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico:
            </label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UID:
            </label>
            <p className="text-gray-900">{user.uid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
