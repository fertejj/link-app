import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db, storage } from "../services/firebase/config"; // Configuración de Firebase
import { createPublicPage } from "../services/PublicPageService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Para subir y obtener imágenes
import { setDoc, doc } from "firebase/firestore"; // Para guardar datos en Firestore


export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
  
    const registerUser = async (
      formData: {
        email: string;
        password: string;
        username: string;
        birthdate: string;
      },
      image: File | null
    ) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
  
        // Subir la imagen a Firebase Storage (opcional)
        let photoURL = "";
        if (image) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, image);
          photoURL = await getDownloadURL(storageRef);
        }
  
        await setDoc(doc(db, "users", user.uid), {
          username: formData.username,
          birthdate: formData.birthdate,
          email: formData.email,
          photoURL,
          createdAt: new Date().toISOString(),
        });
  
        await createPublicPage(user.uid, formData.username);
  
        setError(null);
        return true;
      } catch (err) {
        setError("Error al registrar. Inténtalo nuevamente.");
        return false;
      }
    };
  
    return { registerUser, error };
  };
  