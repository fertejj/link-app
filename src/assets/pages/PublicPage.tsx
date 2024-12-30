import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { PublicPageModel } from "../../components/PublicPage/models/PublicPageModel";
import useLinks from "../../hooks/useLinks";

const PublicPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [publicPage, setPublicPage] = useState<PublicPageModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { links, loadLinks } = useLinks();

  useEffect(() => {
    const fetchPublicPage = async () => {
        if (!username) {
            setError("El nombre de usuario no es válido");
            return;
          }
      try {
        // Buscar la página pública por username
        const querySnapshot = await getDoc(doc(db, "public_pages", username));
        if (querySnapshot.exists()) {
          setPublicPage(querySnapshot.data() as PublicPageModel);
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">{error}</h1>
      </div>
    );
  }

  if (!publicPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800">{publicPage.title}</h1>
      <ul className="mt-6 space-y-4">
        {links.length > 0 ? (
          links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-700">No hay enlaces disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default PublicPage;