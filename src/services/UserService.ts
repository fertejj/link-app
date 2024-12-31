import { setDoc, updateDoc } from "firebase/firestore";

// Función para actualizar un usuario existente
export const updateUser = async (userRef: any, formData: any) => {
  try {
    await updateDoc(userRef, formData);
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error);
  }
};

// Función para crear un usuario nuevo
export const createUser = async (userRef:any, formData:any) => {
  try {
    await setDoc(userRef, { ...formData, username: formData.username });
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error);
  }
};
