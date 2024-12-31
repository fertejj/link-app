export interface User {
    id: string; // ID único del usuario (Firestore document ID)
    username: string; // Nombre de usuario único
    email: string; // Correo electrónico del usuario
    birthdate: string; // Fecha de nacimiento en formato ISO
    photoURL?: string; // URL de la foto de perfil (opcional)
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt: string; // Fecha de última actualización en formato ISO
    publicPageId: string; // ID de la página pública asociada
  }
  