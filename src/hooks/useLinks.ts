import { useState, useEffect } from "react";
import {
  fetchLinks,
  addLink,
  updateLink,
  deleteLink,
} from "../services/LinkService";
import { useAuth } from "../context/AuthContext";
import { Link } from "../models/Link";

/**
 * Custom hook que gestiona los enlaces del usuario autenticado.
 * Proporciona funciones para cargar, agregar, actualizar y eliminar enlaces.
 *
 * @returns {object} - Contiene los enlaces, el estado de carga y las funciones de manejo.
 */
const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  /**
   * Carga los enlaces asociados al usuario autenticado desde la base de datos.
   * Si no hay usuario autenticado, no hace nada.
   *
   * @async
   * @returns {Promise<void>}
   */
  const loadLinks = async () => {
    if (!user) return;
    setLoading(true);
    const fetchedLinks = await fetchLinks(user.uid);
    setLinks(fetchedLinks);
    setLoading(false);
  };

  /**
   * Agrega un nuevo enlace para el usuario autenticado.
   *
   * @async
   * @param {string} title - Título del nuevo enlace.
   * @param {string} url - URL del nuevo enlace.
   * @returns {Promise<void>}
   */
  const handleAddLink = async (title: string, url: string) => {
    if (!user) return;
    const newId: string = (links.length++).toString();
    await addLink(user.uid, title, url, newId);
    loadLinks();
  };

  /**
   * Actualiza un enlace existente del usuario autenticado.
   *
   * @async
   * @param {string} id - ID del enlace a actualizar.
   * @param {string} updatedTitle - Nuevo título del enlace.
   * @param {string} updatedUrl - Nueva URL del enlace.
   * @returns {Promise<void>}
   */
  const handleUpdateLink = async (
    id: string,
    updatedTitle: string,
    updatedUrl: string
  ) => {
    if (!user) return;
    await updateLink(user.uid, id, updatedTitle, updatedUrl);
    loadLinks();
  };

  /**
   * Elimina un enlace existente del usuario autenticado.
   *
   * @async
   * @param {string} id - ID del enlace a eliminar.
   * @returns {Promise<void>}
   */
  const handleDeleteLink = async (id: string) => {
    if (!user) return;
    await deleteLink(user.uid, id);
    loadLinks();
  };

  useEffect(() => {
    loadLinks();
  }, [user]);

  return {
    links,
    loading,
    handleAddLink,
    handleUpdateLink,
    handleDeleteLink,
  };
};

export default useLinks;
