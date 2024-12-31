export interface Settings {
    themes: ThemeOption[]; // Lista de temas disponibles
  }
  
  export interface ThemeOption {
    id: string; // ID único del tema
    name: string; // Nombre del tema
    backgroundColor: string; // Color de fondo
    textColor: string; // Color del texto
    fontFamily: string; // Familia de fuente
  }
  