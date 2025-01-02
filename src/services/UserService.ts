import { setDoc, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase/config"; // Asegúrate de importar correctamente tu configuración de Firebase
import { User } from "../models/User";

/**
 * Función para obtener los datos del usuario actual desde Firestore
 * @param userId - ID del usuario (por ejemplo, user.uid)
 * @returns Datos del usuario en formato User o null si no existe
 */
export const fetchCurrentUser = async (userId: string): Promise<User | null> => {
  try {
    // Referencia al documento del usuario
    const userRef = doc(db, "users", userId);

    // Obtén el documento del usuario
    const userDoc = await getDoc(userRef);

    // Verifica si el documento existe
    if (userDoc.exists()) {
      // Retorna los datos del usuario
      return { id: userDoc.id, ...userDoc.data() } as User;
    } else {
      console.warn(`El usuario con ID ${userId} no existe.`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw new Error("No se pudo obtener los datos del usuario.");
  }
};

/**
 * Función para actualizar un usuario existente
 * @param userId - ID del usuario
 * @param formData - Datos para actualizar
 */
export const updateUser = async (userId: string, formData: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, formData);
    console.log("Usuario actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error al actualizar el usuario: " + error);
  }
};

/**
 * Función para crear un usuario nuevo
 * @param userId - ID del usuario
 * @param formData - Datos del usuario a crear
 */
export const createUser = async (userId: string, formData: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { ...formData, username: formData.username });
    console.log("Usuario creado correctamente");
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario: " + error);
  }
};

/**
 * Función para obtener un usuario específico
 * @param userId - ID del usuario
 * @returns Los datos del usuario si existe
 */
export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      console.log("Usuario obtenido correctamente");
      return { id: userDoc.id, ...userDoc.data() } as User;
    } else {
      console.warn(`El usuario con ID ${userId} no existe.`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error al obtener el usuario: " + error);
  }
};

/**
 * Función para eliminar un usuario
 * @param userId - ID del usuario
 */
export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("Error al eliminar el usuario: " + error);
  }
};
