import { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/config";
import { PublicPage } from "../models/PublicPage";

/**
 * Custom hook para obtener los datos de una página pública basada en un nombre de usuario.
 * Realiza una consulta a Firestore para buscar los datos de una página asociada al nombre de usuario proporcionado.
 *
 * @param {string | undefined} username - Nombre de usuario de la página pública que se desea obtener.
 * @returns {object} - Contiene la página pública (`publicPage`) y cualquier error encontrado (`error`).
 */
const usePublicPage = (username: string | undefined) => {
  const [publicPage, setPublicPage] = useState<PublicPage | null>(null); // Estado para almacenar la página pública
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const fetchPublicPage = useCallback(async () => {
    if (!username) {
      setError("El nombre de usuario no es válido");
      setPublicPage(null); // Limpiar estado si no hay username
      return;
    }
    try {
      const querySnapshot = await getDoc(doc(db, "public_pages", username)); // Consulta Firestore con el nombre de usuario
      if (querySnapshot.exists()) {
        setPublicPage(querySnapshot.data() as PublicPage); // Guarda los datos de la página en el estado
        setError(null); // Limpiar errores si la consulta es exitosa
      } else {
        setPublicPage(null); // Limpiar datos si no se encuentra la página
        setError("Página no encontrada"); // Actualizar estado de error
      }
    } catch (err) {
      console.error(err);
      setPublicPage(null); // Limpiar datos en caso de error
      setError("Error al cargar la página pública"); // Manejo de errores en la consulta
    }
  }, [username]);

  useEffect(() => {
    fetchPublicPage();
  }, [fetchPublicPage]); // Dependencia en la versión memorizada de fetchPublicPage

  return { publicPage, error }; // Retorna la página pública y el error
};

export default usePublicPage;
