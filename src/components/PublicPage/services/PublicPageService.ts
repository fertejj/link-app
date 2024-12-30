import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

/**
 * Crea una página pública inicial para el usuario.
 * @param uid - UID del usuario.
 * @param username - Nombre de usuario único.
 */
export const createPublicPage = async (uid: string, username: string) => {
  const publicPageData = {
    username,
    title: `${username}'s Page`,
    links: [],
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
