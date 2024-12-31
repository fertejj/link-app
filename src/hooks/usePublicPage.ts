// hooks/usePublicPage.ts
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/config";
import { PublicPage } from "../models/PublicPage";

const usePublicPage = (username: string | undefined) => {
  const [publicPage, setPublicPage] = useState<PublicPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicPage = async () => {
      if (!username) {
        setError("El nombre de usuario no es válido");
        return;
      }
      try {
        const querySnapshot = await getDoc(doc(db, "public_pages", username));
        if (querySnapshot.exists()) {
          setPublicPage(querySnapshot.data() as PublicPage);
        } else {
          setError("Página no encontrada");
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar la página pública");
      }
    };
    fetchPublicPage();
  }, [username]);

  return { publicPage, error };
};

export default usePublicPage;
