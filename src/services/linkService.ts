import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "./firebase";

  
  export interface Link {
    id: string;
    title: string;
    url: string;
  }
  
  const getUserLinksCollection = (uid: string) => collection(db, `/users/${uid}/links`);
  
// Fetch Links - Solo del usuario autenticado
export const fetchLinks = async (uid: string): Promise<Link[]> => {
  const userLinksCollection = getUserLinksCollection(uid);
  const snapshot = await getDocs(userLinksCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Link[];
};
  
// Add Link - Guardar con UID del usuario
export const addLink = async (
  uid: string,
  title: string,
  url: string
): Promise<void> => {
  const userLinksCollection = getUserLinksCollection(uid);
  await addDoc(userLinksCollection, { title, url, uid });
};
  
 // Update Link - Solo para un documento específico
export const updateLink = async (
  uid: string,
  id: string,
  updatedTitle: string,
  updatedUrl: string
): Promise<void> => {
  const userLinksCollection = getUserLinksCollection(uid);
  const linkDoc = doc(userLinksCollection, id);
  await updateDoc(linkDoc, { title: updatedTitle, url: updatedUrl });
};

// Delete Link - Solo para un documento específico
export const deleteLink = async (uid: string, id: string): Promise<void> => {
  const userLinksCollection = getUserLinksCollection(uid);
  const linkDoc = doc(userLinksCollection, id);
  await deleteDoc(linkDoc);
};
  