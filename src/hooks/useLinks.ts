import { useState, useEffect } from "react";
import { fetchLinks, addLink, updateLink, deleteLink, Link } from "../services/linkService";
import { useAuth } from "../context/AuthContext";

const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth(); // Obtenemos el usuario autenticado

  const loadLinks = async () => {
    if (!user) return; // Si no hay usuario, no intentamos cargar datos

    setLoading(true);
    const fetchedLinks = await fetchLinks(user.uid);
    setLinks(fetchedLinks);
    setLoading(false);
  };

  const handleAddLink = async (title: string, url: string) => {
    if (!user) return; // Si no hay usuario, evitamos la operación
    
    await addLink(user.uid, title, url);
    loadLinks();
  };

  const handleUpdateLink = async (id: string, updatedTitle: string, updatedUrl: string) => {
    if (!user) return; // Si no hay usuario, evitamos la operación
    await updateLink(user.uid, id, updatedTitle, updatedUrl);
    loadLinks();
  };

  const handleDeleteLink = async (id: string) => {
    if (!user) return; // Si no hay usuario, evitamos la operación
    await deleteLink(user.uid, id);
    loadLinks();
  };

  useEffect(() => {
    loadLinks();
  }, [user]); // Recarga cuando cambia el usuario autenticado

  return {
    links,
    loading,
    handleAddLink,
    handleUpdateLink,
    handleDeleteLink,
  };
};

export default useLinks;
