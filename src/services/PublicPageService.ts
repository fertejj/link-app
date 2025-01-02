import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase/config";

/**
 * Crea una página pública inicial para el usuario.
 * @param uid - UID del usuario.
 * @param username - Nombre de usuario único.
 */
export const createPublicPage = async (uid: string, username: string) => {
  const publicPageData = {
    username,
    title: `${username}'s Page`,
    uid: uid,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "public_pages", username), publicPageData); // Guardar usando username como ID
    console.log("Página pública creada correctamente");
  } catch (error) {
    console.error("Error al crear la página pública:", error);
    throw new Error("Error al crear la página pública");
  }
};

/**
 * Actualiza una página pública existente.
 * @param username - Nombre de usuario único asociado a la página.
 * @param formData - Datos para actualizar la página.
 */
export const updatePublicPage = async (username: string, formData: any) => {
  const publicPageRef = doc(db, "public_pages", username);

  try {
    await setDoc(publicPageRef, formData, { merge: true });
    console.log("Página pública actualizada correctamente");
  } catch (error) {
    console.error("Error al actualizar la página pública:", error);
    throw new Error("Error al actualizar la página pública");
  }
};

/**
 * Obtiene una página pública existente.
 * @param username - Nombre de usuario único asociado a la página.
 * @returns Los datos de la página pública si existe.
 */
export const getPublicPage = async (username: string) => {
  const publicPageRef = doc(db, "public_pages", username);

  try {
    const publicPageSnap = await getDoc(publicPageRef);

    if (publicPageSnap.exists()) {
      console.log("Página pública obtenida correctamente");
      return publicPageSnap.data();
    } else {
      console.error("La página pública no existe");
      throw new Error("La página pública no existe");
    }
  } catch (error) {
    console.error("Error al obtener la página pública:", error);
    throw new Error("Error al obtener la página pública");
  }
};

/**
 * Elimina una página pública existente.
 * @param username - Nombre de usuario único asociado a la página.
 */
export const deletePublicPage = async (username: string) => {
  const publicPageRef = doc(db, "public_pages", username);

  try {
    await deleteDoc(publicPageRef);
    console.log("Página pública eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la página pública:", error);
    throw new Error("Error al eliminar la página pública");
  }
};
