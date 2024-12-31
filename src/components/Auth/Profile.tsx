import React, { useState, useEffect } from "react";
import { db } from "../../services/firebase/config";
import { useAuth } from "../../context/AuthContext";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { createPublicPage, updatePublicPage } from "../../services/PublicPageService";
import { createUser, updateUser } from "../../services/UserService";

const Profile: React.FC = () => {
  
  const { user } = useAuth(); // Accede al usuario desde el contexto
  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData({
            username: data.username || "",
            birthdate: data.birthdate || "",
            email: data.email || "",
          });
        }
      }
    };
    fetchUserData();
  }, [user]);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar cambios en Firestore
  const handleSaveChanges = async () => {
    if (!user) return;
  
    try {
      const userRef = doc(db, "users", user.uid);
  
      // Obtén los datos actuales del usuario
      const userDoc = await getDoc(userRef);
      const currentData = userDoc.exists() ? userDoc.data() : {};
      const previousUsername = currentData.username || null;
  
      const newUsername = formData.username;
      const publicPageRef = doc(db, "public_pages", newUsername);
  
      if (previousUsername && previousUsername !== newUsername) {
        // Eliminar el documento asociado al username anterior
        const oldPublicPageRef = doc(db, "public_pages", previousUsername);
        await deleteDoc(oldPublicPageRef);
      }
  
      // Actualizar o crear el documento en "users"
      if (userDoc.exists()) {
        await updateUser(userRef, formData);
      } else {
        await createUser(userRef, formData);
      }
  
      // Crear o actualizar el documento en "public_pages"
      const publicPageDoc = await getDoc(publicPageRef);
      if (publicPageDoc.exists()) {
        await updatePublicPage(publicPageRef, formData);
      } else {
        await createPublicPage(user.uid, newUsername);
      }
  
      console.log("Perfil actualizado correctamente.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
  

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
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Foto de Perfil"
              className="w-24 h-24 mt-2 rounded-full mx-auto"
            />
          ) : (
            <p className="text-gray-900">Imagen no disponible</p>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de usuario:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="text-gray-900">
                {formData.username || "No disponible"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento:
            </label>
            {isEditing ? (
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="text-gray-900">
                {formData.birthdate || "No disponible"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico:
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="text-gray-900">{formData.email}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
