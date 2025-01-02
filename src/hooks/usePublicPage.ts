import { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/config";
import { PublicPage } from "../models/PublicPage";

/**
 * Custom hook para obtener los datos de una página pública basada en un nombre de usuario.
 *
 * @param {string | undefined} username - Nombre de usuario de la página pública que se desea obtener.
 * @returns {object} - Contiene la página pública (`publicPage`), cualquier error encontrado (`error`), y un indicador de carga (`isLoading`).
 */
const usePublicPage = (username: string | undefined) => {
  const [publicPage, setPublicPage] = useState<PublicPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPublicPage = useCallback(async () => {
    if (!username) {
      setError("El nombre de usuario no es válido");
      setPublicPage(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const publicPageRef = doc(db, "public_pages", username);
      const publicPageDoc = await getDoc(publicPageRef);

      if (publicPageDoc.exists()) {
        setPublicPage(publicPageDoc.data() as PublicPage);
      } else {
        setPublicPage(null);
        setError("Página no encontrada");
      }
    } catch (err) {
      console.error("Error al obtener la página pública:", err);
      setPublicPage(null);
      setError("Error al cargar la página pública");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchPublicPage();
  }, [fetchPublicPage]);

  return { publicPage, error, isLoading };
};

export default usePublicPage;
