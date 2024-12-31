import { Link } from "./Link";
import { Theme } from "./Theme";

export interface PublicPage {
  id: string; // ID único de la página pública (Firestore document ID)
  userId: string; // Referencia al usuario propietario
  username: string; // Nombre de usuario único asociado
  bio: string; // Descripción o biografía de la página pública
  links: Link[]; // Lista de enlaces personalizados
  theme: Theme; // Configuración del tema
  createdAt: string; // Fecha de creación en formato ISO
  updatedAt: string; // Fecha de última actualización en formato ISO
}