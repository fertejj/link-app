import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase"; // Importa tu configuración de Firestore

/**
 * Guarda la información del usuario en Firestore.
 * @param uid - ID único del usuario proporcionado por Firebase Authentication.
 * @param userData - Objeto con la información adicional del usuario.
 */
export const setUserData = async (uid: string, userData: { [key: string]: any }) => {
  try {
    // Crea el documento en la colección "users" con el UID del usuario
    await setDoc(doc(db, "users", uid), {
      ...userData,
      createdAt: new Date().toISOString(), // Agrega marca de tiempo
    });
    console.log("Datos del usuario guardados en Firestore correctamente.");
  } catch (error) {
    console.error("Error al guardar los datos del usuario en Firestore:", error);
    throw new Error("Error al guardar los datos del usuario.");
  }
};
