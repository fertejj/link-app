import { useEffect, useState } from "react";
import { fetchCurrentUser, getUser } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { User } from "../models/User";
import { storage } from "../services/firebase/config";
import { deleteObject, ref } from "firebase/storage";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | any>();
  const { user } = useAuth();

  const obtenerPathsDesdeURLs = (urls: string): string => {
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/TU_PROYECTO.appspot.com/o/";

    decodeURIComponent(baseUrl.replace(baseUrl, "").split("?")[0]);
  };

  const removeUserImage = async () => {
    try {
      const imgPaths = obtenerPathsDesdeURLs(currentUser.photoURL);

      const deletePromises = imgPaths;
      const storageRef = ref(storage, imgPaths);
      deleteObject(storageRef);

      await Promise.all(deletePromises);
      console.log("Imágenes eliminadas con éxito");
    } catch (error) {
      console.error("Error al eliminar las imágenes:", error);
      throw error; // Re-lanzar el error para manejarlo en removeProduct
    }
  };

  const loadUser = async () => {
    if (!user) return;
    setLoading(true);
    const fetchedUser = await fetchCurrentUser(user.uid);
    setCurrentUser(fetchedUser);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, [user]);

  return {
    currentUser,
    removeUserImage,
    useUser,
  };
};

export default useUser;
