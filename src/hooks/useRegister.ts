import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db, storage } from "../services/firebase/config"; // Configuración de Firebase
import { createPublicPage } from "../services/PublicPageService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Para subir y obtener imágenes
import { setDoc, doc } from "firebase/firestore"; // Para guardar datos en Firestore

/**
 * Custom hook para registrar un nuevo usuario en Firebase.
 * Este hook utiliza Firebase Authentication, Firestore y Storage para crear un usuario,
 * almacenar su información en Firestore y subir una imagen de perfil opcional.
 *
 * @returns {object} - Contiene la función `registerUser` para registrar al usuario y un estado `error` para manejar errores.
 */
export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);

  /**
   * Registra un nuevo usuario en Firebase.
   *
   * @param {object} formData - Datos del formulario de registro del usuario.
   * @param {string} formData.email - Correo electrónico del usuario.
   * @param {string} formData.password - Contraseña del usuario.
   * @param {string} formData.username - Nombre de usuario único.
   * @param {string} formData.birthdate - Fecha de nacimiento del usuario.
   * @param {File | null} image - Archivo de imagen para el perfil del usuario (opcional).
   * @returns {Promise<boolean>} - Devuelve `true` si el registro fue exitoso, `false` en caso contrario.
   */
  const registerUser = async (
    formData: {
      email: string;
      password: string;
      username: string;
      birthdate: string;
    },
    image: File | null
  ) => {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Subir la imagen de perfil a Firebase Storage (si se proporciona)
      let photoURL = "";
      if (image) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, image);
        photoURL = await getDownloadURL(storageRef);
      }

      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        birthdate: formData.birthdate,
        email: formData.email,
        photoURL,
        createdAt: new Date().toISOString(),
      });

      // Crear la página pública del usuario
      await createPublicPage(user.uid, formData.username);

      setError(null);
      return true; // Registro exitoso
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
      setError("Error al registrar. Inténtalo nuevamente.");
      return false; // Registro fallido
    }
  };

  return { registerUser, error };
};
